import { mediaLabel, productVideo } from "@/lib/media";

/** The uncut product walkthrough. Nothing loads until the visitor presses play. */
export function ProductVideo() {
  return (
    <figure className="product-video">
      <video
        controls
        preload="none"
        playsInline
        poster="/media/product/product-demo-poster.webp"
        width={productVideo.width}
        height={productVideo.height}
        aria-label={`${productVideo.title}: ${productVideo.description}`}
      >
        <source src="/media/product/product-demo.webm" type="video/webm" />
        <source src="/media/product/product-demo.mp4" type="video/mp4" />
        <track kind="captions" src="/media/product/product-demo.en.vtt" srcLang="en" label="English" default />
      </video>
      <figcaption>
        {productVideo.title} · {Math.round(productVideo.durationSeconds)} s, no sound, English captions · {mediaLabel}
      </figcaption>
    </figure>
  );
}
