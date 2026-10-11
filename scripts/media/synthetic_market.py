"""Deterministic synthetic market for public product media (loopback only).

Serves the four routes the Research market adapter reads (`/api/v1/instruments`,
`/coverage`, `/candles`, `/funding`, `/rules`) with the same response shapes as
the Backtest market service, but every price is generated from a fixed seed.
No exchange data is read or stored, so screenshots taken against it carry no
third-party market data.

Usage: python3 scripts/media/synthetic_market.py [--port 8031]
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import random
import time
from functools import lru_cache
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

HOUR_MS = 3_600_000
INTERVAL_MS = {
    "1h": HOUR_MS,
    "4h": 4 * HOUR_MS,
    "12h": 12 * HOUR_MS,
    "1d": 24 * HOUR_MS,
    "1w": 168 * HOUR_MS,
}
FUNDING_STEP_MS = 8 * HOUR_MS
WEEK_MS = INTERVAL_MS["1w"]
# First candle: the first epoch-aligned week on or after 2021-01-01 UTC.
BASE_MS = -(-1_609_459_200_000 // WEEK_MS) * WEEK_MS
DATA_REVISION = 1

INSTRUMENTS = {
    # A trending series with alternating bull and bear regimes.
    "SYNTH-TREND-PERP": {"ui_symbol": "SYNTHETIC-TREND.P", "seed": 20261011, "kind": "trend"},
    # A mean-reverting series around a fixed level.
    "SYNTH-RANGE-PERP": {"ui_symbol": "SYNTHETIC-RANGE.P", "seed": 20261012, "kind": "range"},
}
RULES = {
    "price_tick": "0.01",
    "quantity_step": "0.001",
    "min_quantity": "0.001",
    "min_notional": "5",
    "trading": True,
}


def now_ms() -> int:
    return int(time.time() * 1000)


def hours_needed() -> int:
    # One spare day so the newest candle of every interval exists.
    return (now_ms() - BASE_MS) // HOUR_MS + 24


@lru_cache(maxsize=None)
def hourly(instrument: str, count: int) -> tuple[tuple[float, float, float, float, float], ...]:
    """(open, high, low, close, volume) for `count` hours from BASE_MS."""
    spec = INSTRUMENTS[instrument]
    rng = random.Random(spec["seed"])
    price = 100.0
    rows = []
    regime_drift = 0.0
    for i in range(count):
        if spec["kind"] == "trend":
            if i % (24 * 90) == 0:
                # A new 90-day regime: mostly up, sometimes down.
                regime_drift = rng.choice((0.00022, 0.00018, 0.00012, -0.00016, -0.0002))
            ret = regime_drift + rng.gauss(0, 0.0065)
        else:
            ret = -0.004 * math.log(price / 100.0) + rng.gauss(0, 0.0055)
        close = max(price * math.exp(ret), 0.01)
        wick = abs(rng.gauss(0, 0.0025))
        high = max(price, close) * (1 + wick)
        low = min(price, close) * (1 - abs(rng.gauss(0, 0.0025)))
        volume = 800 + abs(rng.gauss(0, 1)) * 1200
        rows.append((price, high, low, close, volume))
        price = close
    return tuple(rows)


@lru_cache(maxsize=None)
def candles(instrument: str, interval: str, count: int) -> tuple[dict, ...]:
    step_hours = INTERVAL_MS[interval] // HOUR_MS
    hours = hourly(instrument, count)
    rows = []
    for start in range(0, len(hours) - step_hours + 1, step_hours):
        chunk = hours[start : start + step_hours]
        open_time = BASE_MS + start * HOUR_MS
        rows.append(
            {
                "open_time": open_time,
                "close_time": open_time + INTERVAL_MS[interval] - 1,
                "open": f"{chunk[0][0]:.2f}",
                "high": f"{max(r[1] for r in chunk):.2f}",
                "low": f"{min(r[2] for r in chunk):.2f}",
                "close": f"{chunk[-1][3]:.2f}",
                "volume": f"{sum(r[4] for r in chunk):.3f}",
            }
        )
    return tuple(rows)


def visible(instrument: str, interval: str) -> list[dict]:
    """Candles that have opened by now, each marked closed or not."""
    current = now_ms()
    return [
        {**row, "is_closed": row["close_time"] < current}
        for row in candles(instrument, interval, hours_needed())
        if row["open_time"] <= current
    ]


def coverage(instrument: str, interval: str, start: int, end: int) -> dict:
    rows = [r for r in visible(instrument, interval) if start <= r["open_time"] <= end]
    everything = visible(instrument, interval)
    return {
        "instrument_id": instrument,
        "interval": interval,
        "environment": "SYNTHETIC",
        "data_status": {
            "earliest_ms": rows[0]["open_time"] if rows else None,
            "latest_ms": rows[-1]["open_time"] if rows else None,
            "count": len(rows),
            "missing_ranges": [],
            "stale": False,
            "valid_ohlc": True,
            "overlap_count": 0,
        },
        "deployment_status": {
            "venue": "SYNTHETIC",
            "market": "PERP",
            "network": "NONE",
            "symbol": instrument,
            "interval": interval,
            "purpose": "media",
            "ready": True,
            "reason": None,
            "state": "COMPLETE",
            "current_data_revision": DATA_REVISION,
            "verified_data_revision": DATA_REVISION,
            "requested_range": [start, end],
            "available_range": [everything[0]["open_time"], everything[-1]["open_time"]],
            "missing_ranges": [],
            "latest_error": None,
        },
    }


def funding(instrument: str, start: int, end: int) -> dict:
    hours = hourly(instrument, hours_needed())
    rng_seed = INSTRUMENTS[instrument]["seed"]
    first = -(-start // FUNDING_STEP_MS) * FUNDING_STEP_MS
    points = []
    for t in range(max(first, BASE_MS), min(end, now_ms()) + 1, FUNDING_STEP_MS):
        index = (t - BASE_MS) // HOUR_MS
        # Small positive rates with deterministic noise, like a perpetual's funding.
        noise = random.Random(rng_seed * 1_000_003 + index).gauss(0, 0.00004)
        points.append(
            {
                "funding_time_ms": t,
                "rate": f"{0.0001 + noise:.8f}",
                "mark_price": f"{hours[index][0]:.2f}",
                "mark_price_estimated": False,
            }
        )
    return {
        "instrument_id": instrument,
        "start": start,
        "end": end,
        "data_revision": DATA_REVISION,
        "coverage": {
            "count": len(points),
            "missing_ranges": [],
            "unpriced_ms": [],
            "off_cadence_ms": [],
        },
        "points": points,
    }


def rules(instrument: str) -> dict:
    body = {"instrument_id": instrument, **RULES}
    return {
        "instrument_id": instrument,
        "snapshot_sha256": hashlib.sha256(json.dumps(body, sort_keys=True).encode()).hexdigest(),
        "feed_name": "synthetic-media",
        "created_ms": BASE_MS,
        "rules": body,
    }


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args) -> None:
        pass

    def send(self, status: int, body: dict) -> None:
        data = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self) -> None:  # noqa: N802 - http.server API
        url = urlparse(self.path)
        q = {k: v[0] for k, v in parse_qs(url.query).items()}
        instrument = q.get("instrument_id")
        if url.path == "/health":
            return self.send(200, {"status": "ok", "service": "synthetic-market"})
        if url.path == "/api/v1/instruments":
            return self.send(
                200,
                {
                    "instruments": [
                        {
                            "instrument_id": key,
                            "ui_symbol": spec["ui_symbol"],
                            "native_symbol": key,
                            "environment": "SYNTHETIC",
                            "market_kind": "PERPETUAL",
                            "intervals": list(INTERVAL_MS),
                        }
                        for key, spec in INSTRUMENTS.items()
                    ]
                },
            )
        if instrument not in INSTRUMENTS:
            return self.send(422 if url.path != "/api/v1/rules" else 404, {"message": "unknown instrument"})
        try:
            if url.path == "/api/v1/rules":
                return self.send(200, rules(instrument))
            start, end = int(q["start"]), int(q["end"])
            if url.path == "/api/v1/funding":
                return self.send(200, funding(instrument, start, end))
            interval = q["interval"]
            if interval not in INTERVAL_MS:
                return self.send(422, {"message": "unknown interval"})
            if url.path == "/api/v1/coverage":
                return self.send(200, coverage(instrument, interval, start, end))
            if url.path == "/api/v1/candles":
                rows = [r for r in visible(instrument, interval) if start <= r["open_time"] <= end]
                return self.send(
                    200,
                    {
                        "instrument_id": instrument,
                        "interval": interval,
                        "environment": "SYNTHETIC",
                        "data_revision": DATA_REVISION,
                        "candles": rows,
                    },
                )
        except (KeyError, ValueError):
            return self.send(422, {"message": "invalid query"})
        return self.send(404, {"message": "not found"})


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--port", type=int, default=8031)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    server.serve_forever()


if __name__ == "__main__":
    main()
