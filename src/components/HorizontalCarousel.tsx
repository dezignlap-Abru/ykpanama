"use client";

import { useRef, useState, ReactNode, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface HorizontalCarouselProps {
  children: ReactNode[];
  cardWidth?: number;
  gap?: number;
}

export default function HorizontalCarousel({
  children,
  cardWidth = 340,
  gap = 24,
}: HorizontalCarouselProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const count = children.length;

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current?.parentElement) {
        setContainerWidth(containerRef.current.parentElement.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate offset to center the active card
  const getOffset = (index: number) => {
    const cardCenter = index * (cardWidth + gap) + cardWidth / 2;
    return -(cardCenter - containerWidth / 2);
  };

  const snapToCard = (index: number) => {
    const clamped = Math.max(0, Math.min(index, count - 1));
    animate(x, getOffset(clamped), {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    setCurrentIndex(clamped);
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = currentIndex;
    if (offset < -50 || velocity < -500) newIndex = currentIndex + 1;
    if (offset > 50 || velocity > 500) newIndex = currentIndex - 1;

    snapToCard(newIndex);
  };

  // Snap to first card once container width is known
  useEffect(() => {
    if (containerWidth > 0) {
      animate(x, getOffset(0), { duration: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth]);

  const totalTrackWidth = count * cardWidth + (count - 1) * gap;
  const maxDrag = 0;
  const minDrag = -(totalTrackWidth - containerWidth);

  return (
    <div className="w-full overflow-hidden" style={{ touchAction: "pan-y" }}>
      {/* Carousel track */}
      <motion.div
        ref={containerRef}
        className="flex cursor-grab active:cursor-grabbing"
        style={{ x, gap: `${gap}px` }}
        drag="x"
        dragConstraints={{ left: minDrag, right: maxDrag }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {children.map((child, i) => (
          <div key={i} className="shrink-0" style={{ width: cardWidth }}>
            {child}
          </div>
        ))}
      </motion.div>

      {/* Dot indicators + arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Left arrow (desktop only) */}
        <button
          onClick={() => snapToCard(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => snapToCard(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "bg-gray-900 w-6"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* Right arrow (desktop only) */}
        <button
          onClick={() => snapToCard(currentIndex + 1)}
          disabled={currentIndex === count - 1}
          className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
