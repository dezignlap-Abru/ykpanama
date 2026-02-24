"use client";

import { useState, useEffect } from "react";

const CAMP_START = new Date("2026-06-22T00:00:00");

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.total <= 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <span className="text-white/30 text-lg sm:text-2xl font-light">:</span>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
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

function getTimeLeft() {
  const now = new Date();
  const total = CAMP_START.getTime() - now.getTime();

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}
