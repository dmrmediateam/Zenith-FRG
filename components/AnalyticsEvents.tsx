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
    trackEvent("page_view", getAttribution());
  }, []);

  return null;
}

/** Fades in elements with the `.reveal` class as they enter the viewport. */
export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
