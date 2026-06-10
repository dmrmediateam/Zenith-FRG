export const UNIT_INTEREST_VALUES = ["residence", "penthouse", "not_sure"] as const;
export type UnitInterest = (typeof UNIT_INTEREST_VALUES)[number];

export const BUDGET_VALUES = [
  "under_600k",
  "600k_1m",
  "1m_2m",
  "2m_plus",
] as const;
export type Budget = (typeof BUDGET_VALUES)[number];

export const TIMELINE_VALUES = [
  "ready_now",
  "3_6_months",
  "6_12_months",
  "just_exploring",
] as const;
export type Timeline = (typeof TIMELINE_VALUES)[number];

export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitInterest: UnitInterest | "";
  budget: Budget | "";
  timeline: Timeline | "";
  source: string;
  attribution?: Record<string, string>;
}
