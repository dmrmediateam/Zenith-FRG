"use client";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: (command: string, ...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __clarityQueue?: string[];
  }
}

export type AnalyticsPayload = Record<string, unknown>;

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.clarity === "function") {
    window.clarity("event", event);
  } else {
    window.__clarityQueue = window.__clarityQueue || [];
    window.__clarityQueue.push(event);
  }
}

export function trackMetaPixel(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") {
    window.fbq("track", event, payload);
  }
}

/**
 * Call once after Clarity is confirmed loaded (e.g. via a useEffect poll).
 * Drains any events that fired before the Clarity snippet was ready.
 */
export function flushClarityQueue() {
  if (typeof window === "undefined") return;
  if (typeof window.clarity !== "function") return;
  const queue = window.__clarityQueue;
  if (!queue?.length) return;
  window.__clarityQueue = [];
  for (const name of queue) {
    window.clarity("event", name);
  }
}

export function getAttribution() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: "",
      landingPageUrl: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const stored = window.sessionStorage.getItem("zenith_attribution");
  let previous: Record<string, string> = {};
  try {
    previous = stored ? JSON.parse(stored) : {};
  } catch {
    previous = {};
  }
  const attribution = {
    utm_source: params.get("utm_source") || previous.utm_source || "",
    utm_medium: params.get("utm_medium") || previous.utm_medium || "",
    utm_campaign: params.get("utm_campaign") || previous.utm_campaign || "",
    utm_content: params.get("utm_content") || previous.utm_content || "",
    utm_term: params.get("utm_term") || previous.utm_term || "",
    referrer: previous.referrer || document.referrer || "",
    landingPageUrl: previous.landingPageUrl || window.location.href,
  };

  window.sessionStorage.setItem(
    "zenith_attribution",
    JSON.stringify(attribution)
  );

  return attribution;
}
