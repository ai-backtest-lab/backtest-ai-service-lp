"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { mediaLabel, productVideo } from "@/lib/media";

/**
 * The uncut product walkthrough. It loads and plays, muted and looping, only while it is
 * in view, and never starts on its own for visitors who prefer reduced motion. The
 * pause button keeps auto-playing content stoppable (WCAG 2.2.2).
 */
export function ProductVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.pause();
        else if (!pausedByVisitor.current) video.play().catch(() => {});
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    pausedByVisitor.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <figure className="product-video">
      <div className="product-video-frame">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/product/product-demo-poster.webp"
          width={productVideo.width}
          height={productVideo.height}
          aria-label={`${productVideo.title}: ${productVideo.description}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/product/product-demo.webm" type="video/webm" />
          <source src="/media/product/product-demo.mp4" type="video/mp4" />
          <track kind="captions" src="/media/product/product-demo.en.vtt" srcLang="en" label="English" default />
        </video>
        <button
          type="button"
          className="video-toggle"
          onClick={toggle}
          aria-label={playing ? "Pause product demo" : "Play product demo"}
        >
          {playing ? <Pause /> : <Play />}
        </button>
      </div>
      <figcaption>
        {productVideo.title} · {Math.round(productVideo.durationSeconds)} s, no sound, English captions · {mediaLabel}
      </figcaption>
    </figure>
  );
}
