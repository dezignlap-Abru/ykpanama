"use client";

import { useState, useEffect } from "react";

const EARLY_BIRD_DEADLINE = new Date("2026-03-31T23:59:59");

function useEarlyBirdCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function getTimeLeft() {
  const now = new Date();
  const total = EARLY_BIRD_DEADLINE.getTime() - now.getTime();

  if (total <= 0) {
    return { isEarlyBird: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    isEarlyBird: true,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function EarlyBirdPricingBar() {
  const { isEarlyBird, days, hours, minutes, seconds } =
    useEarlyBirdCountdown();

  return (
    <div>
      <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-gray-400 mb-0.5 sm:mb-1">
        Price
      </p>
      {isEarlyBird ? (
        <>
          <p className="text-gray-400 text-xs sm:text-sm">
            <span className="line-through">$4,200</span>
          </p>
          <p className="font-bold text-gray-900 text-lg sm:text-2xl">
            $4,000{" "}
            <span className="text-emerald-600 font-medium text-xs sm:text-sm">
              Early Bird
            </span>
          </p>
          <p className="text-[10px] sm:text-xs text-emerald-600 font-medium tabular-nums mt-0.5">
            {days}d {String(hours).padStart(2, "0")}h{" "}
            {String(minutes).padStart(2, "0")}m{" "}
            {String(seconds).padStart(2, "0")}s left
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400">
            Airfare not included
          </p>
        </>
      ) : (
        <>
          <p className="font-bold text-gray-900 text-lg sm:text-2xl">
            $4,200
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400">
            Airfare not included
          </p>
        </>
      )}
    </div>
  );
}

export function EarlyBirdPricingForm() {
  const { isEarlyBird, days, hours, minutes, seconds } =
    useEarlyBirdCountdown();

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Program Cost</span>
        <span className="text-lg font-bold text-gray-900">
          {isEarlyBird ? "$4,000" : "$4,200"}
        </span>
      </div>
      {isEarlyBird ? (
        <div className="mt-1">
          <p className="text-xs text-gray-500">
            Early bird pricing —{" "}
            <span className="line-through">$4,200</span>
          </p>
          <p className="text-xs text-emerald-600 font-medium tabular-nums mt-0.5">
            Ends in {days}d {String(hours).padStart(2, "0")}h{" "}
            {String(minutes).padStart(2, "0")}m{" "}
            {String(seconds).padStart(2, "0")}s
          </p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 mt-1">Standard registration</p>
      )}
    </div>
  );
}
