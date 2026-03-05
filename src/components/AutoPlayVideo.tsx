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

    // iOS requires muted as a DOM property, not just an attribute
    video.muted = true;
    video.playsInline = true;

    // Force play on mount
    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    // Retry on first user interaction (iOS sometimes blocks until touch)
    const handleInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("touchstart", handleInteraction, { once: true });
    window.addEventListener("click", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
    />
  );
}
