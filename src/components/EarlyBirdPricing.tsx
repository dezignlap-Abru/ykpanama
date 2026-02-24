"use client";

import { useState, useEffect } from "react";

const EARLY_BIRD_DEADLINE = new Date("2026-03-31T23:59:59");

export function EarlyBirdPricingBar() {
  const [isEarlyBird, setIsEarlyBird] = useState(true);

  useEffect(() => {
    setIsEarlyBird(new Date() <= EARLY_BIRD_DEADLINE);
  }, []);

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
          <p className="text-[10px] sm:text-xs text-gray-400">
            Before Mar 31 &middot; Airfare not included
          </p>
        </>
      ) : (
        <>
          <p className="font-bold text-gray-900 text-lg sm:text-2xl">$4,200</p>
          <p className="text-[10px] sm:text-xs text-gray-400">
            Airfare not included
          </p>
        </>
      )}
    </div>
  );
}

export function EarlyBirdPricingForm() {
  const [isEarlyBird, setIsEarlyBird] = useState(true);

  useEffect(() => {
    setIsEarlyBird(new Date() <= EARLY_BIRD_DEADLINE);
  }, []);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Program Cost</span>
        <span className="text-lg font-bold text-gray-900">
          {isEarlyBird ? "$4,000" : "$4,200"}
        </span>
      </div>
      {isEarlyBird ? (
        <p className="text-xs text-gray-500 mt-1">
          Early bird pricing — <span className="line-through">$4,200</span>{" "}
          until March 31, 2026
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-1">Standard registration</p>
      )}
    </div>
  );
}
