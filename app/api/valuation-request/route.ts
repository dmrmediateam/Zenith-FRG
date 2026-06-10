import { NextRequest, NextResponse } from "next/server";
import {
  isBuyerTimeline,
  isEstimatedValueBand,
  isLeadQualified,
  type BuyerTimeline,
  type EstimatedValueBand,
} from "@/lib/leadQualification";

interface ValuationRequestBody {
  addressLine1: string;
  city: string;
  zip: string;
  name: string;
  email: string;
  phone: string;
  beds: string;
  baths: string;
  sqft: string;
  estimatedValue: string;
  timeline: string;
  qualified?: boolean;
  eventType?: "step_continue" | "page_exit" | "final_submit";
  step?: number;
  submissionId?: string;
  partial?: boolean;
  attribution?: {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    referrer: string;
    landingPageUrl: string;
  };
}

const FORM_FIELDS = [
  "addressLine1",
  "city",
  "zip",
  "name",
  "email",
  "phone",
  "beds",
  "baths",
  "sqft",
  "estimatedValue",
  "timeline",
] as const;

const REQUIRED_FINAL_FIELDS = [
  "addressLine1",
  "city",
  "zip",
  "name",
  "email",
  "phone",
  "beds",
  "baths",
  "sqft",
  "estimatedValue",
  "timeline",
] as const;

type FormField = (typeof FORM_FIELDS)[number];

function readString(body: Record<string, unknown>, key: FormField) {
  return typeof body[key] === "string" ? body[key].trim() : "";
}

function normalizeBody(body: Record<string, unknown>): ValuationRequestBody {
  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? (body.attribution as Record<string, unknown>)
      : {};

  return {
    addressLine1: readString(body, "addressLine1"),
    city: readString(body, "city"),
    zip: readString(body, "zip"),
    name: readString(body, "name"),
    email: readString(body, "email"),
    phone: readString(body, "phone"),
    beds: readString(body, "beds"),
    baths: readString(body, "baths"),
    sqft: readString(body, "sqft"),
    estimatedValue: readString(body, "estimatedValue"),
    timeline: readString(body, "timeline"),
    qualified: typeof body.qualified === "boolean" ? body.qualified : undefined,
    eventType:
      body.eventType === "step_continue" ||
      body.eventType === "page_exit" ||
      body.eventType === "final_submit"
        ? body.eventType
        : undefined,
    step: typeof body.step === "number" ? body.step : undefined,
    submissionId: typeof body.submissionId === "string" ? body.submissionId : "",
    partial: typeof body.partial === "boolean" ? body.partial : undefined,
    attribution: {
      utm_source:
        typeof attribution.utm_source === "string" ? attribution.utm_source : "",
      utm_medium:
        typeof attribution.utm_medium === "string" ? attribution.utm_medium : "",
      utm_campaign:
        typeof attribution.utm_campaign === "string"
          ? attribution.utm_campaign
          : "",
      utm_content:
        typeof attribution.utm_content === "string" ? attribution.utm_content : "",
      utm_term:
        typeof attribution.utm_term === "string" ? attribution.utm_term : "",
      referrer:
        typeof attribution.referrer === "string" ? attribution.referrer : "",
      landingPageUrl:
        typeof attribution.landingPageUrl === "string"
          ? attribution.landingPageUrl
          : "",
    },
  };
}

function getMissingFinalFields(body: ValuationRequestBody) {
  return REQUIRED_FINAL_FIELDS.filter((field) => !body[field].trim());
}

function isValidFinalBody(body: ValuationRequestBody) {
  if (getMissingFinalFields(body).length > 0) return false;
  if (!/\S+@\S+\.\S+/.test(body.email)) return false;

  const beds = Number(body.beds);
  const baths = Number(body.baths);
  const sqft = Number(body.sqft);
  if (Number.isNaN(beds) || beds < 0) return false;
  if (Number.isNaN(baths) || baths < 0) return false;
  if (Number.isNaN(sqft) || sqft < 1) return false;

  if (!isEstimatedValueBand(body.estimatedValue)) return false;
  if (!isBuyerTimeline(body.timeline)) return false;

  return true;
}

function hasAnyFormValue(body: ValuationRequestBody) {
  return FORM_FIELDS.some((field) => body[field].trim().length > 0);
}

async function readRequestJson(req: NextRequest) {
  const text = await req.text();
  if (!text) return null;
  return JSON.parse(text) as unknown;
}

async function sendToZapier(payload: Record<string, unknown>) {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[Valuation Request] ZAPIER_WEBHOOK_URL is not configured");
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    return { ok: true, skipped: false };
  } catch (error) {
    console.error("[Valuation Request] Zapier submission failed", error);
    return { ok: false };
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await readRequestJson(req);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const normalized = normalizeBody(body as Record<string, unknown>);
  const isFinal = normalized.eventType === "final_submit" || normalized.partial === false;
  const missingFields = getMissingFinalFields(normalized);

  if (!isFinal && !hasAnyFormValue(normalized)) {
    return NextResponse.json({ success: true, skipped: true }, { status: 200 });
  }

  if (isFinal && !isValidFinalBody(normalized)) {
    return NextResponse.json(
      { error: "Missing or invalid fields", missingFields },
      { status: 422 }
    );
  }

  const hasQualificationInputs =
    isEstimatedValueBand(normalized.estimatedValue) &&
    isBuyerTimeline(normalized.timeline);
  const computedQualified = hasQualificationInputs
    ? isLeadQualified(
        normalized.estimatedValue as EstimatedValueBand,
        normalized.timeline as BuyerTimeline
      )
    : null;

  const zapierPayload = {
    ...normalized,
    utm_source: normalized.attribution?.utm_source ?? "",
    utm_medium: normalized.attribution?.utm_medium ?? "",
    utm_campaign: normalized.attribution?.utm_campaign ?? "",
    utm_content: normalized.attribution?.utm_content ?? "",
    utm_term: normalized.attribution?.utm_term ?? "",
    referrer: normalized.attribution?.referrer ?? "",
    landingPageUrl: normalized.attribution?.landingPageUrl ?? "",
    source: "gregg_rossman_luxury_valuation",
    partial: !isFinal,
    eventType: normalized.eventType ?? (isFinal ? "final_submit" : "partial"),
    missingFields,
    qualifiedServer: computedQualified,
    receivedAt: new Date().toISOString(),
  };

  const zapierResult = await sendToZapier(zapierPayload);
  if (isFinal && !zapierResult.ok) {
    return NextResponse.json(
      { error: "Could not submit valuation request" },
      { status: 502 }
    );
  }

  console.log("[Valuation Request]", zapierPayload);

  return NextResponse.json(
    { success: true, zapier: zapierResult },
    { status: 200 }
  );
}
