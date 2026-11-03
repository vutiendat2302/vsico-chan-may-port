"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function calculateRemaining(targetIso: string): CountdownState {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: diff <= 0,
  };
}

export function useCountdown(targetIso: string): CountdownState {
  const prefersReducedMotion = useReducedMotion();
  const [remaining, setRemaining] = useState<CountdownState>({
    days: 300,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const update = () => {
      setRemaining(calculateRemaining(targetIso));
    };

    const initialTimer = window.setTimeout(update, 0);

    if (prefersReducedMotion) {
      return () => window.clearTimeout(initialTimer);
    }

    const interval = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [prefersReducedMotion, targetIso]);

  return remaining;
}
