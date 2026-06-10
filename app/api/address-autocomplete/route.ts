import { NextRequest, NextResponse } from "next/server";

interface AddressSuggestion {
  id: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  label: string;
}

interface NominatimResult {
  place_id?: number;
  display_name?: string;
  address?: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    municipality?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
  };
}

const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 5;
const PROVIDER_RESULT_LIMIT = 10;

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function pickCity(address: NominatimResult["address"]) {
  return (
    address?.city ??
    address?.town ??
    address?.village ??
    address?.hamlet ??
    address?.municipality ??
    ""
  );
}

function normalizeZip(postcode?: string) {
  if (!postcode) return "";
  const match = postcode.trim().match(/^\d{5}(?:-\d{4})?/);
  return match?.[0] ?? "";
}

function normalizeSuggestion(result: NominatimResult): AddressSuggestion | null {
  const address = result.address;
  const addressLine1 = normalizeWhitespace(
    `${address?.house_number ?? ""} ${address?.road ?? ""}`
  );
  const city = normalizeWhitespace(pickCity(address));
  const state = normalizeWhitespace(address?.state ?? "");
  const zip = normalizeZip(address?.postcode);
  const isUsAddress = address?.country_code?.toLowerCase() === "us";

  if (!isUsAddress || !addressLine1 || !city || !state || !zip) {
    return null;
  }

  return {
    id: String(result.place_id ?? `${addressLine1}-${city}-${zip}`),
    addressLine1,
    city,
    state,
    zip,
    label: `${addressLine1}, ${city}, ${state} ${zip}`,
  };
}

async function fetchSuggestions(query: string) {
  const params = new URLSearchParams({
    q: query,
    countrycodes: "us",
    format: "jsonv2",
    addressdetails: "1",
    dedupe: "1",
    limit: String(PROVIDER_RESULT_LIMIT),
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        "Accept-Language": "en-US",
        "User-Agent":
          process.env.ADDRESS_AUTOCOMPLETE_USER_AGENT ??
          "gregg-rossman-luxury-valuation/1.0",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Provider request failed with status ${response.status}`);
  }

  return (await response.json()) as NominatimResult[];
}

export async function GET(req: NextRequest) {
  const query = normalizeWhitespace(
    req.nextUrl.searchParams.get("q")?.slice(0, 200) ?? ""
  );

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ suggestions: [] satisfies AddressSuggestion[] });
  }

  try {
    const providerResults = await fetchSuggestions(query);
    const deduped = new Map<string, AddressSuggestion>();

    for (const result of providerResults) {
      const suggestion = normalizeSuggestion(result);
      if (!suggestion) continue;

      const dedupeKey = [
        suggestion.addressLine1.toLowerCase(),
        suggestion.city.toLowerCase(),
        suggestion.state.toLowerCase(),
        suggestion.zip,
      ].join("|");

      if (!deduped.has(dedupeKey)) {
        deduped.set(dedupeKey, suggestion);
      }

      if (deduped.size >= MAX_RESULTS) break;
    }

    return NextResponse.json({
      suggestions: Array.from(deduped.values()),
    });
  } catch (error) {
    console.error("[Address Autocomplete] lookup failed", error);
    return NextResponse.json(
      { error: "Address lookup failed", suggestions: [] },
      { status: 502 }
    );
  }
}
