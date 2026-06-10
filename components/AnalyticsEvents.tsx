"use client";

import { useEffect } from "react";
import { flushClarityQueue, getAttribution, trackEvent } from "@/lib/analytics";

/** Fires scroll-depth milestones once per page load. */
function useScrollDepth() {
  useEffect(() => {
    const milestones = [25, 50, 75, 90];
    const reached = new Set<number>();

    function onScroll() {
      const el = document.documentElement;
      const pct = Math.round(
        ((el.scrollTop + el.clientHeight) / el.scrollHeight) * 100
      );
      for (const m of milestones) {
        if (pct >= m && !reached.has(m)) {
          reached.add(m);
          trackEvent("scroll_depth", { percent: m });
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/**
 * Polls until Clarity is available, then drains any events that fired
 * before GTM (and the Clarity snippet inside it) finished loading.
 */
function useClarityFlush() {
  useEffect(() => {
    if (typeof window.clarity === "function") {
      flushClarityQueue();
      return;
    }
    const id = window.setInterval(() => {
      if (typeof window.clarity === "function") {
        flushClarityQueue();
        window.clearInterval(id);
      }
    }, 200);
    return () => window.clearInterval(id);
  }, []);
}

export function LandingPageAnalytics() {
  useScrollDepth();
  useClarityFlush();

  useEffect(() => {
    trackEvent("landing_page_view", getAttribution());
  }, []);

  return null;
}

export function ThankYouAnalytics({
  outcome,
}: {
  outcome: "qualified" | "disqualified";
}) {
  useEffect(() => {
    trackEvent(`valuation_form_${outcome}`, { outcome });
  }, [outcome]);

  return null;
}
