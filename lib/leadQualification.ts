export const ESTIMATED_VALUE_VALUES = [
  "under_250k",
  "250k_650k",
  "650k_1m",
  "1m_plus",
] as const;

export type EstimatedValueBand = (typeof ESTIMATED_VALUE_VALUES)[number];

export const TIMELINE_VALUES = [
  "now",
  "1_3_months",
  "3_6_months",
  "6_plus_months",
  "just_looking",
] as const;

export type BuyerTimeline = (typeof TIMELINE_VALUES)[number];

export function isLeadQualified(
  estimatedValue: EstimatedValueBand,
  timeline: BuyerTimeline
): boolean {
  if (estimatedValue === "under_250k") return false;
  if (timeline === "6_plus_months" || timeline === "just_looking") return false;
  return true;
}

export function isEstimatedValueBand(v: string): v is EstimatedValueBand {
  return (ESTIMATED_VALUE_VALUES as readonly string[]).includes(v);
}

export function isBuyerTimeline(v: string): v is BuyerTimeline {
  return (TIMELINE_VALUES as readonly string[]).includes(v);
}
