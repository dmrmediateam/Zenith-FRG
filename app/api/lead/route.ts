import { NextRequest, NextResponse } from "next/server";

interface LeadRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitInterest: string;
  budget: string;
  timeline: string;
  source: string;
  attribution?: Record<string, unknown>;
}

function readString(body: Record<string, unknown>, key: keyof LeadRequestBody) {
  return typeof body[key] === "string" ? (body[key] as string).trim() : "";
}

function normalizeBody(body: Record<string, unknown>): LeadRequestBody {
  const attribution =
    body.attribution && typeof body.attribution === "object"
      ? (body.attribution as Record<string, unknown>)
      : {};

  return {
    firstName: readString(body, "firstName"),
    lastName: readString(body, "lastName"),
    email: readString(body, "email"),
    phone: readString(body, "phone"),
    unitInterest: readString(body, "unitInterest"),
    budget: readString(body, "budget"),
    timeline: readString(body, "timeline"),
    source: readString(body, "source") || "zenith-dmr-landing",
    attribution: Object.fromEntries(
      Object.entries(attribution).filter(([, v]) => typeof v === "string")
    ) as Record<string, string>,
  };
}

function isValid(body: LeadRequestBody) {
  if (!body.firstName || !body.lastName || !body.email) return false;
  if (!/\S+@\S+\.\S+/.test(body.email)) return false;
  return true;
}

async function sendToWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[Lead] LEAD_WEBHOOK_URL is not configured");
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
    console.error("[Lead] webhook submission failed", error);
    return { ok: false };
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    const text = await req.text();
    body = text ? JSON.parse(text) : null;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const normalized = normalizeBody(body as Record<string, unknown>);

  if (!isValid(normalized)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  const payload = {
    ...normalized,
    receivedAt: new Date().toISOString(),
  };

  const result = await sendToWebhook(payload);
  if (!result.ok) {
    return NextResponse.json({ error: "Could not submit lead" }, { status: 502 });
  }

  console.log("[Lead]", payload);

  return NextResponse.json({ success: true, webhook: result }, { status: 200 });
}
