"use client";

import dayjs from "dayjs";
import { useEffect, useRef } from "react";

export const useStartTimeTracker = (problemId: string, mode: "debug" | "challenge") => {
  const key = `startedAt:${problemId}`;
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mode === "debug") return;
    if (hasInitialized.current) return;

    const existing = localStorage.getItem(key);
    if (!existing) {
      const isoString = dayjs().toISOString();
      localStorage.setItem(key, isoString);
    }

    hasInitialized.current = true;
  }, [key, mode]);

  const getStartedAt = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  };

  const clearStartedAt = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  return {
    getStartedAt,
    clearStartedAt,
  };
};
