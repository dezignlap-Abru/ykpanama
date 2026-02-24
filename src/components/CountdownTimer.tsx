"use client";

import { useState, useEffect } from "react";

const EARLY_BIRD_DEADLINE = new Date("2026-03-31T23:59:59");
const CAMP_START = new Date("2026-06-22T00:00:00");

export default function CountdownTimer() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isEarlyBird = now <= EARLY_BIRD_DEADLINE;
  const target = isEarlyBird ? EARLY_BIRD_DEADLINE : CAMP_START;
  const total = target.getTime() - now.getTime();

  if (total <= 0 && !isEarlyBird) return null;

  const timeLeft = total > 0 ? calcTime(total) : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="text-center">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-white/60 mb-2 sm:mb-3 font-medium">
        {isEarlyBird ? "Early Bird Ends In" : "Camp Starts In"}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <TimeBlock value={timeLeft.days} label="Days" />
        <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
        <TimeBlock value={timeLeft.minutes} label="Min" />
        <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
        <TimeBlock value={timeLeft.seconds} label="Sec" />
      </div>
      {isEarlyBird && (
        <p className="text-[10px] sm:text-xs text-emerald-300/80 mt-2">
          Save $200 — Apply before March 31
        </p>
      )}
    </div>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-4xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[9px] sm:text-[11px] uppercase tracking-widest text-white/50 mt-1">
        {label}
      </div>
    </div>
  );
}

function calcTime(total: number) {
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
