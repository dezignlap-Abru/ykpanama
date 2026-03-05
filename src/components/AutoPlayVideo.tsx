"use client";

import { useRef, useEffect } from "react";

interface AutoPlayVideoProps {
  src: string;
  className?: string;
}

export default function AutoPlayVideo({ src, className }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS requires these as DOM properties
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };

    // Try immediately
    tryPlay();

    // Retry when enough data is buffered
    const handleCanPlay = () => tryPlay();
    video.addEventListener("canplay", handleCanPlay);

    // Retry after a short delay (helps on some iOS versions)
    const timer = setTimeout(tryPlay, 500);

    // Fallback: retry on first user interaction
    const handleInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
    window.addEventListener("click", handleInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      video.removeEventListener("canplay", handleCanPlay);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={videoRef}
      className={className}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
