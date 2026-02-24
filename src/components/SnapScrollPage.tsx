"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { SnapScrollContext } from "./SnapScrollContext";

interface SnapScrollPageProps {
  snapSections: ReactNode[];
  normalSections: ReactNode[];
  sectionIds?: string[];
}

const DOT_LABELS = [
  "Top",
  "About",
  "Experience",
  "Journey",
];

export default function SnapScrollPage({
  snapSections,
  normalSections,
  sectionIds = [],
}: SnapScrollPageProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  // Track which section is most visible using scroll events (faster than IntersectionObserver)
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      const center = scrollTop + viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const sectionCenter = ref.offsetTop + ref.clientHeight / 2;
        const distance = Math.abs(center - sectionCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveSection(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, [snapSections.length]);

  // Handle anchor link clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      e.preventDefault();
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const ref = sectionRefs.current[index];
    ref?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  return (
    <SnapScrollContext value={{ activeSection }}>
      <main
        ref={mainRef}
        className="h-[100dvh] overflow-y-auto snap-y snap-proximity"
      >
        {/* Snap sections */}
        {snapSections.map((section, i) => (
          <section
            key={i}
            id={sectionIds[i] || undefined}
            ref={setSectionRef(i)}
            className="h-[100dvh] snap-start relative flex items-center justify-center overflow-hidden"
          >
            {section}
          </section>
        ))}

        {/* Normal scroll sections (form, contact, footer) */}
        {normalSections.map((section, i) => (
          <div
            key={`normal-${i}`}
            id={sectionIds[snapSections.length + i] || undefined}
          >
            {section}
          </div>
        ))}
      </main>

      {/* Side dot navigation (desktop only) */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {DOT_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToSection(i)}
            className={`group relative flex items-center justify-end transition-all duration-300 cursor-pointer`}
            aria-label={`Go to ${label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-5 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {label}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === activeSection
                  ? "w-3 h-3 bg-gray-900"
                  : "w-2 h-2 bg-gray-300 group-hover:bg-gray-500"
              }`}
            />
          </button>
        ))}
      </nav>
    </SnapScrollContext>
  );
}
