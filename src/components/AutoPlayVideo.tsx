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

    // Force play on mount — needed for some mobile browsers
    video.play().catch(() => {
      // Autoplay blocked — silently ignore
    });
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
    />
  );
}
