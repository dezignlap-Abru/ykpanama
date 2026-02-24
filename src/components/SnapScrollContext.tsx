"use client";

import { createContext, useContext } from "react";

interface SnapScrollState {
  activeSection: number;
}

const SnapScrollContext = createContext<SnapScrollState>({ activeSection: 0 });

export function useSnapScroll() {
  return useContext(SnapScrollContext);
}

export { SnapScrollContext };
