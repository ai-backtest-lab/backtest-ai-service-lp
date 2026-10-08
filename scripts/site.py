#!/usr/bin/env python3
"""Own exactly one loopback development or static-preview process per mode."""
import argparse, json, os, signal, socket, subprocess, sys, time, urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
STATE = ROOT / '.runtime'
PORTS = {'dev': 3220, 'preview': 3221}

def start_time(pid):
    try:
        fields = Path(f'/proc/{pid}/stat').read_text().rsplit(')', 1)[1].split()
        return None if fields[0] == 'Z' else fields[19]
    except (FileNotFoundError, ProcessLookupError):
        return None

def owned(record):
    try:
        same_directory = Path(f'/proc/{record['pid']}/cwd').resolve(strict=True) == ROOT
        same_user = Path(f'/proc/{record['pid']}').stat().st_uid == os.getuid()
    except (OSError, KeyError):
        return False
    return same_directory and same_user and bool(record.get('start_time')) and (record.get('root') == str(ROOT)) and (start_time(record['pid']) == record.get('start_time'))

def load(mode):
    path = STATE / f'{mode}.json'
    return json.loads(path.read_text()) if path.exists() else None

def stop(mode):
    record = load(mode)
    if record and owned(record):
        os.killpg(record['pid'], signal.SIGTERM)
        for _ in range(30):
            if not owned(record):
                break
            time.sleep(0.1)
        else:
            os.killpg(record['pid'], signal.SIGKILL)
    if record and (not owned(record)):
        (STATE / f'{mode}.json').unlink(missing_ok=True)
    print(f'{mode}: stopped; source and build preserved')

def start(mode):
    record = load(mode)
    if record and owned(record):
        print(f'{mode}: already running http://127.0.0.1:{PORTS[mode]}')
        return
    with socket.socket() as s:
        if s.connect_ex(('127.0.0.1', PORTS[mode])) == 0:
            raise SystemExit(f'Port {PORTS[mode]} is in use; no takeover')
    if mode == 'preview' and (not (ROOT / 'out/index.html').is_file()):
        raise SystemExit('Run make build first')
    STATE.mkdir(exist_ok=True)
    command = ['pnpm', 'dev'] if mode == 'dev' else [sys.executable, str(Path(__file__).resolve()), 'server']
    with (STATE / f'{mode}.log').open('ab') as log:
        process = subprocess.Popen(command, cwd=ROOT, stdin=subprocess.DEVNULL, stdout=log, stderr=log, start_new_session=True)
    record = {'pid': process.pid, 'start_time': start_time(process.pid), 'root': str(ROOT), 'mode': mode, 'port': PORTS[mode]}
    (STATE / f'{mode}.json').write_text(json.dumps(record) + '\n')
    for _ in range(60):
        if process.poll() is not None:
            break
        try:
            with urllib.request.urlopen(f'http://127.0.0.1:{PORTS[mode]}/', timeout=1) as response:
                if response.status == 200:
                    print(f'{mode}: ready http://127.0.0.1:{PORTS[mode]}')
                    return
        except (OSError, TimeoutError):
            pass
        time.sleep(0.2)
    stop(mode)
    raise SystemExit(f'{mode} startup failed; see .runtime/{mode}.log')

class Handler(SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / 'out'), **kwargs)

    def list_directory(self, path):
        self.send_error(404)
        return None

    def do_GET(self):
        original = Path(self.translate_path(self.path))
        if original.is_dir():
            original = original / 'index.html'
        compressed = original.with_name(original.name + '.gz')
        if 'gzip' in self.headers.get('Accept-Encoding', '') and compressed.is_file() and compressed.resolve().is_relative_to((ROOT / 'out').resolve()):
            body = compressed.read_bytes()
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(original)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def end_headers(self):
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Cache-Control', 'public, max-age=31536000, immutable' if self.path.startswith('/_next/static/') else 'no-cache')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['dev', 'preview', 'stop', 'status', 'server'])
    args = parser.parse_args()
    if args.action == 'server':
        ThreadingHTTPServer(('127.0.0.1', PORTS['preview']), Handler).serve_forever()
    elif args.action in ('dev', 'preview'):
        start(args.action)
    elif args.action == 'stop':
        for mode in PORTS:
            stop(mode)
    else:
        for mode, port in PORTS.items():
            record = load(mode)
            print(f'{mode}: {('running' if record and owned(record) else 'stopped')} http://127.0.0.1:{port}')
