"use client";

import dayjs from "dayjs";
import { useEffect, useRef } from "react";

/**
 * カスタムフック: 問題の開始時刻を追跡します。
 *
 * このフックは、問題の開始時刻を localStorage に保存し、取得・クリアするためのメソッドを提供します。
 *
 * @param {string} problemId - 問題のID。
 * @param {"debug" | "challenge"} mode - 問題のモード（debug または challenge）。
 * @returns {Object} 開始時刻を取得・クリアするためのメソッドを含むオブジェクト。
 * @returns {() => string | null} getStartedAt - 開始時刻（ISO文字列）を取得します。存在しない場合は null を返します。
 * @returns {() => void} clearStartedAt - 開始時刻を localStorage から削除します。
 */
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
