"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  isLeadQualified,
  type BuyerTimeline,
  type EstimatedValueBand,
} from "@/lib/leadQualification";
import { getAttribution, trackEvent } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "error";
type SubmissionEvent = "step_continue" | "page_exit" | "final_submit";

const WORTH_OPTIONS: { value: EstimatedValueBand; label: string }[] = [
  { value: "under_250k", label: "Under $250k" },
  { value: "250k_650k", label: "$250k–$650k" },
  { value: "650k_1m", label: "$650k–$1m" },
  { value: "1m_plus", label: "$1m+" },
];

const TIMELINE_OPTIONS: { value: BuyerTimeline; label: string }[] = [
  { value: "now", label: "Now" },
  { value: "1_3_months", label: "1–3 Months" },
  { value: "3_6_months", label: "3–6 Months" },
  { value: "6_plus_months", label: "6+ Months" },
  { value: "just_looking", label: "Just Looking" },
];

interface FullForm {
  addressLine1: string;
  city: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  beds: string;
  baths: string;
  sqft: string;
  estimatedValue: EstimatedValueBand | "";
  timeline: BuyerTimeline | "";
}

interface AddressSuggestion {
  id: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  label: string;
}

const INITIAL: FullForm = {
  addressLine1: "",
  city: "",
  zip: "",
  name: "",
  phone: "",
  email: "",
  beds: "",
  baths: "",
  sqft: "",
  estimatedValue: "",
  timeline: "",
};

const DRAFT_COOKIE = "gregg_rossman_valuation_draft";
const SUBMISSION_ID_COOKIE = "gregg_rossman_valuation_submission_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const ADDRESS_AUTOCOMPLETE_MIN_CHARS = 2;
const ADDRESS_AUTOCOMPLETE_DEBOUNCE_MS = 120;
const ADDRESS_BLUR_CLOSE_DELAY_MS = 140;

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return value ? decodeURIComponent(value) : "";
}

function writeCookie(name: string, value: string, maxAge = COOKIE_MAX_AGE) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function clearCookie(name: string) {
  writeCookie(name, "", 0);
}

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function trimForm(form: FullForm): FullForm {
  return {
    addressLine1: form.addressLine1.trim(),
    city: form.city.trim(),
    zip: form.zip.trim(),
    name: form.name.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    beds: form.beds.trim(),
    baths: form.baths.trim(),
    sqft: form.sqft.trim(),
    estimatedValue: form.estimatedValue,
    timeline: form.timeline,
  };
}

function hasAnyDraftValue(form: FullForm) {
  return Object.values(form).some((value) => String(value).trim().length > 0);
}

function getQualified(form: FullForm) {
  if (!form.estimatedValue || !form.timeline) return null;
  return isLeadQualified(form.estimatedValue, form.timeline);
}

function getFormFingerprint(form: FullForm) {
  return JSON.stringify(trimForm(form));
}

export default function ValuationForm({ id }: { id?: string }) {
  const router = useRouter();
  const addressListboxId = useId();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FullForm>(INITIAL);
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FullForm, string>>>(
    {}
  );
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [addressLookupState, setAddressLookupState] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [activeAddressSuggestionIndex, setActiveAddressSuggestionIndex] =
    useState(-1);
  const [tcpaConsent, setTcpaConsent] = useState(false);
  const [tcpaError, setTcpaError] = useState(false);
  const tcpaConsentRef = useRef(false);
  const formRef = useRef(form);
  const elementRef = useRef<HTMLFormElement | null>(null);
  const stepRef = useRef(step);
  const submissionIdRef = useRef("");
  const draftLoadedRef = useRef(false);
  const lastSentFingerprintRef = useRef("");
  const finalSubmittedRef = useRef(false);
  const submitInFlightRef = useRef(false);
  const formStartedRef = useRef(false);
  const pageExitSentRef = useRef(false);
  const attributionRef = useRef<ReturnType<typeof getAttribution> | null>(null);
  const addressBlurTimeoutRef = useRef<number | null>(null);
  const skipNextAddressLookupRef = useRef(false);

  useEffect(() => {
    formRef.current = form;
    if (!draftLoadedRef.current) return;
    writeCookie(DRAFT_COOKIE, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    tcpaConsentRef.current = tcpaConsent;
  }, [tcpaConsent]);

  useEffect(() => {
    attributionRef.current = getAttribution();

    let submissionId = readCookie(SUBMISSION_ID_COOKIE);
    if (!submissionId) {
      submissionId = createSubmissionId();
      writeCookie(SUBMISSION_ID_COOKIE, submissionId);
    }
    submissionIdRef.current = submissionId;

    const draft = readCookie(DRAFT_COOKIE);
    if (draft) {
      try {
        const parsed = JSON.parse(draft) as Partial<FullForm>;
        setForm((prev) => ({ ...prev, ...parsed }));
      } catch {
        clearCookie(DRAFT_COOKIE);
      }
    }
    draftLoadedRef.current = true;
  }, [id]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      trackEvent("valuation_form_view", { form_id: id ?? "valuation-form" });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        trackEvent("valuation_form_view", { form_id: id ?? "valuation-form" });
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [id]);

  const buildPayload = useCallback((eventType: SubmissionEvent, currentStep = stepRef.current) => {
    const currentForm = trimForm(formRef.current);
    return {
      ...currentForm,
      eventType,
      step: currentStep,
      submissionId: submissionIdRef.current,
      qualified: getQualified(currentForm),
      partial: eventType !== "final_submit",
      attribution: attributionRef.current ?? getAttribution(),
    };
  }, []);

  const saveDraft = useCallback(() => {
    writeCookie(DRAFT_COOKIE, JSON.stringify(trimForm(formRef.current)));
  }, []);

  const sendPartial = useCallback((
    eventType: SubmissionEvent,
    currentStep = stepRef.current
  ) => {
    const currentForm = formRef.current;
    if (!hasAnyDraftValue(currentForm)) return;

    const fingerprint = getFormFingerprint(currentForm);
    if (fingerprint === lastSentFingerprintRef.current) return;

    const payload = buildPayload(eventType, currentStep);
    const body = JSON.stringify(payload);
    lastSentFingerprintRef.current = fingerprint;

    if (eventType === "page_exit" && "sendBeacon" in navigator) {
      navigator.sendBeacon(
        "/api/valuation-request",
        new Blob([body], { type: "application/json" })
      );
      return;
    }

    void fetch("/api/valuation-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: eventType === "page_exit",
    }).catch(() => {
      // Partial captures should never interrupt the form experience.
    });
  }, [buildPayload]);

  useEffect(() => {
    function handlePageExit() {
      if (finalSubmittedRef.current) return;
      if (submitInFlightRef.current) return;
      if (pageExitSentRef.current) return;
      pageExitSentRef.current = true;
      saveDraft();
      sendPartial("page_exit", stepRef.current);
    }

    window.addEventListener("pagehide", handlePageExit);

    return () => {
      window.removeEventListener("pagehide", handlePageExit);
    };
  }, [saveDraft, sendPartial]);

  useEffect(() => {
    return () => {
      if (addressBlurTimeoutRef.current !== null) {
        window.clearTimeout(addressBlurTimeoutRef.current);
      }
    };
  }, []);

  function clearFieldError(field: keyof FullForm) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function clearFieldErrors(fields: (keyof FullForm)[]) {
    setErrors((prev) => {
      const next = { ...prev };
      for (const field of fields) {
        delete next[field];
      }
      return next;
    });
  }

  function validateStep1(): boolean {
    const next: Partial<Record<keyof FullForm, string>> = {};
    if (!form.name.trim()) next.name = "Your name is required.";
    if (!form.phone.trim()) next.phone = "A phone number is required.";
    if (!form.addressLine1.trim())
      next.addressLine1 = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.zip.trim()) next.zip = "ZIP code is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2(): boolean {
    const next: Partial<Record<keyof FullForm, string>> = {};
    if (!form.beds.trim()) next.beds = "Required.";
    if (!form.baths.trim()) next.baths = "Required.";
    if (!form.sqft.trim()) next.sqft = "Required.";
    if (!form.estimatedValue) next.estimatedValue = "Please select an option.";
    const bedsN = Number(form.beds);
    const bathsN = Number(form.baths);
    const sqftN = Number(form.sqft);
    if (Number.isNaN(bedsN) || bedsN < 0) next.beds = "Enter a valid number.";
    if (Number.isNaN(bathsN) || bathsN < 0)
      next.baths = "Enter a valid number.";
    if (Number.isNaN(sqftN) || sqftN < 1)
      next.sqft = "Enter square footage.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep3(): boolean {
    const next: Partial<Record<keyof FullForm, string>> = {};
    if (!form.email.trim()) next.email = "Email is required.";
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.timeline) next.timeline = "Please select an option.";
    setErrors(next);
    const noTcpa = !tcpaConsent;
    setTcpaError(noTcpa);
    return Object.keys(next).length === 0 && !noTcpa;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    trackEvent("valuation_step_complete", {
      form_id: id ?? "valuation-form",
      step,
    });
    saveDraft();
    sendPartial("step_continue", step);
    setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
    setState("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitInFlightRef.current || finalSubmittedRef.current) return;
    trackEvent("valuation_form_submit_attempt", {
      form_id: id ?? "valuation-form",
    });
    if (!validateStep3()) return;

    const ev = form.estimatedValue as EstimatedValueBand;
    const tl = form.timeline as BuyerTimeline;
    const qualified = isLeadQualified(ev, tl);

    submitInFlightRef.current = true;
    setState("submitting");
    try {
      const res = await fetch("/api/valuation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...trimForm(form),
          estimatedValue: ev,
          timeline: tl,
          qualified,
          eventType: "final_submit",
          step: 3,
          submissionId: submissionIdRef.current,
          partial: false,
          tcpaConsent: tcpaConsentRef.current,
          attribution: attributionRef.current ?? getAttribution(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      finalSubmittedRef.current = true;
      trackEvent("valuation_form_submit_success", {
        form_id: id ?? "valuation-form",
        qualified,
      });
      clearCookie(DRAFT_COOKIE);
      clearCookie(SUBMISSION_ID_COOKIE);
      router.push(qualified ? "/thank-you-q" : "/thank-you-dq");
    } catch {
      submitInFlightRef.current = false;
      setState("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent("valuation_form_start", {
        form_id: id ?? "valuation-form",
        first_field: e.target.name,
      });
    }
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name as keyof FullForm);
  }

  useEffect(() => {
    if (step !== 1) return;

    const query = form.addressLine1.trim();

    if (skipNextAddressLookupRef.current) {
      skipNextAddressLookupRef.current = false;
      return;
    }

    if (query.length < ADDRESS_AUTOCOMPLETE_MIN_CHARS) {
      setAddressSuggestions([]);
      setAddressLookupState("idle");
      setAddressDropdownOpen(false);
      setActiveAddressSuggestionIndex(-1);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setAddressLookupState("loading");
      setAddressDropdownOpen(true);

      try {
        const response = await fetch(
          `/api/address-autocomplete?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Address lookup failed");
        }

        const data = (await response.json()) as {
          suggestions?: AddressSuggestion[];
        };

        setAddressSuggestions(data.suggestions ?? []);
        setAddressLookupState("idle");
        setActiveAddressSuggestionIndex(-1);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[Address Autocomplete] lookup failed", error);
        setAddressSuggestions([]);
        setAddressLookupState("error");
        setActiveAddressSuggestionIndex(-1);
      }
    }, ADDRESS_AUTOCOMPLETE_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [form.addressLine1, step]);

  function selectAddressSuggestion(suggestion: AddressSuggestion) {
    skipNextAddressLookupRef.current = true;
    setForm((prev) => ({
      ...prev,
      addressLine1: suggestion.addressLine1,
      city: suggestion.city,
      zip: suggestion.zip,
    }));
    clearFieldErrors(["addressLine1", "city", "zip"]);
    setAddressSuggestions([]);
    setAddressLookupState("idle");
    setAddressDropdownOpen(false);
    setActiveAddressSuggestionIndex(-1);
  }

  function handleAddressLine1Change(e: React.ChangeEvent<HTMLInputElement>) {
    setAddressDropdownOpen(true);
    handleChange(e);
  }

  function handleAddressLine1Focus() {
    if (addressBlurTimeoutRef.current !== null) {
      window.clearTimeout(addressBlurTimeoutRef.current);
      addressBlurTimeoutRef.current = null;
    }

    if (
      form.addressLine1.trim().length >= ADDRESS_AUTOCOMPLETE_MIN_CHARS &&
      (addressSuggestions.length > 0 ||
        addressLookupState === "loading" ||
        addressLookupState === "error")
    ) {
      setAddressDropdownOpen(true);
    }
  }

  function handleAddressLine1Blur() {
    addressBlurTimeoutRef.current = window.setTimeout(() => {
      setAddressDropdownOpen(false);
      setActiveAddressSuggestionIndex(-1);
    }, ADDRESS_BLUR_CLOSE_DELAY_MS);
  }

  function handleAddressLine1KeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const hasSuggestions = addressSuggestions.length > 0;
    const showDropdown =
      addressDropdownOpen &&
      form.addressLine1.trim().length >= ADDRESS_AUTOCOMPLETE_MIN_CHARS &&
      (hasSuggestions || addressLookupState === "loading" || addressLookupState === "error");

    if (e.key === "Escape") {
      setAddressDropdownOpen(false);
      setActiveAddressSuggestionIndex(-1);
      return;
    }

    if (!hasSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!showDropdown) {
        setAddressDropdownOpen(true);
        setActiveAddressSuggestionIndex(0);
        return;
      }
      setActiveAddressSuggestionIndex((prev) =>
        Math.min(prev + 1, addressSuggestions.length - 1)
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!showDropdown) {
        setAddressDropdownOpen(true);
        setActiveAddressSuggestionIndex(addressSuggestions.length - 1);
        return;
      }
      setActiveAddressSuggestionIndex((prev) =>
        prev <= 0 ? 0 : prev - 1
      );
      return;
    }

    if (e.key === "Enter" && showDropdown && activeAddressSuggestionIndex >= 0) {
      e.preventDefault();
      const suggestion = addressSuggestions[activeAddressSuggestionIndex];
      if (suggestion) {
        selectAddressSuggestion(suggestion);
      }
    }
  }

  function handleRadio<K extends keyof FullForm>(
    field: K,
    value: FullForm[K]
  ) {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackEvent("valuation_form_start", {
        form_id: id ?? "valuation-form",
        first_field: field,
      });
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  }

  const showAddressDropdown =
    addressDropdownOpen &&
    form.addressLine1.trim().length >= ADDRESS_AUTOCOMPLETE_MIN_CHARS &&
    (addressSuggestions.length > 0 ||
      addressLookupState === "loading" ||
      addressLookupState === "error");

  return (
    <form
      ref={elementRef}
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-2" role="status" aria-live="polite">
        {[1, 2, 3].map((n) => (
          <span key={n} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium font-sans transition-colors ${
                step === n
                  ? "bg-gold-500 text-white"
                  : step > n
                    ? "bg-charcoal-800 text-white"
                    : "bg-stone-100 text-stone-400"
              }`}
            >
              {n}
            </span>
            {n < 3 && (
              <span
                className={`hidden sm:block w-8 h-px ${step > n ? "bg-charcoal-300" : "bg-stone-200"}`}
                aria-hidden
              />
            )}
          </span>
        ))}
      </div>
      <p className="text-center text-xs uppercase tracking-widest text-stone-400 font-sans">
        Step {step} of 3
      </p>

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="addressLine1"
              className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
            >
              Address
            </label>
            <input
              id="addressLine1"
              name="addressLine1"
              type="text"
              autoComplete="address-line1"
              placeholder="Street address"
              value={form.addressLine1}
              onChange={handleAddressLine1Change}
              onFocus={handleAddressLine1Focus}
              onBlur={handleAddressLine1Blur}
              onKeyDown={handleAddressLine1KeyDown}
              className="luxury-input"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showAddressDropdown}
              aria-controls={addressListboxId}
              aria-activedescendant={
                activeAddressSuggestionIndex >= 0
                  ? `${addressListboxId}-option-${activeAddressSuggestionIndex}`
                  : undefined
              }
              aria-invalid={!!errors.addressLine1}
              aria-describedby={
                errors.addressLine1 ? "addressLine1-error" : undefined
              }
            />
            {showAddressDropdown && (
              <div
                id={addressListboxId}
                role="listbox"
                className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-stone-200 bg-white shadow-lg"
              >
                {addressLookupState === "loading" && (
                  <div className="px-4 py-3 text-sm text-stone-500 font-sans">
                    Searching addresses…
                  </div>
                )}
                {addressLookupState === "error" && (
                  <div className="px-4 py-3 text-sm text-red-500 font-sans">
                    Couldn&apos;t load address suggestions.
                  </div>
                )}
                {addressLookupState === "idle" &&
                  addressSuggestions.length === 0 && (
                    <div className="px-4 py-3 text-sm text-stone-500 font-sans">
                      No matching addresses found.
                    </div>
                  )}
                {addressSuggestions.map((suggestion, index) => {
                  const isActive = index === activeAddressSuggestionIndex;

                  return (
                    <button
                      key={suggestion.id}
                      id={`${addressListboxId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`block w-full px-4 py-3 text-left text-sm font-sans transition-colors ${
                        isActive
                          ? "bg-gold-50 text-charcoal-800"
                          : "bg-white text-charcoal-700 hover:bg-stone-50"
                      }`}
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      onMouseEnter={() => {
                        setActiveAddressSuggestionIndex(index);
                      }}
                      onClick={() => {
                        selectAddressSuggestion(suggestion);
                      }}
                    >
                      {suggestion.label}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.addressLine1 && (
              <p id="addressLine1-error" className="mt-1 text-xs text-red-500 font-sans">
                {errors.addressLine1}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
              />
              {errors.city && (
                <p id="city-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Zip
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="ZIP"
                value={form.zip}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? "zip-error" : undefined}
              />
              {errors.zip && (
                <p id="zip-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.zip}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="beds"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Beds
              </label>
              <input
                id="beds"
                name="beds"
                type="number"
                min={0}
                step={1}
                placeholder="e.g. 4"
                value={form.beds}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.beds}
                aria-describedby={errors.beds ? "beds-error" : undefined}
              />
              {errors.beds && (
                <p id="beds-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.beds}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="baths"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Baths
              </label>
              <input
                id="baths"
                name="baths"
                type="number"
                min={0}
                step={0.5}
                placeholder="e.g. 3.5"
                value={form.baths}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.baths}
                aria-describedby={errors.baths ? "baths-error" : undefined}
              />
              {errors.baths && (
                <p id="baths-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.baths}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="sqft"
                className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
              >
                Sqft
              </label>
              <input
                id="sqft"
                name="sqft"
                type="number"
                min={1}
                step={1}
                placeholder="Living area sq ft"
                value={form.sqft}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.sqft}
                aria-describedby={errors.sqft ? "sqft-error" : undefined}
              />
              {errors.sqft && (
                <p id="sqft-error" className="mt-1 text-xs text-red-500 font-sans">
                  {errors.sqft}
                </p>
              )}
            </div>
          </div>

          <fieldset>
            <legend className="block text-xs tracking-wider uppercase text-stone-400 mb-3 font-sans">
              What do you think the home is worth?
            </legend>
            <div className="space-y-2">
              {WORTH_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                    form.estimatedValue === opt.value
                      ? "border-gold-500 bg-gold-50/80 text-charcoal-800"
                      : "border-stone-100 bg-white text-charcoal-700 hover:border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="estimatedValue"
                    value={opt.value}
                    checked={form.estimatedValue === opt.value}
                    onChange={() =>
                      handleRadio("estimatedValue", opt.value)
                    }
                    className="h-4 w-4 accent-gold-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.estimatedValue && (
              <p className="mt-2 text-xs text-red-500 font-sans">
                {errors.estimatedValue}
              </p>
            )}
          </fieldset>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs tracking-wider uppercase text-stone-400 mb-1.5 font-sans"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="luxury-input"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500 font-sans">
                {errors.email}
              </p>
            )}
          </div>
          <fieldset>
            <legend className="block text-xs tracking-wider uppercase text-stone-400 mb-3 font-sans">
              Timeline
            </legend>
            <div className="space-y-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                    form.timeline === opt.value
                      ? "border-gold-500 bg-gold-50/80 text-charcoal-800"
                      : "border-stone-100 bg-white text-charcoal-700 hover:border-stone-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={opt.value}
                    checked={form.timeline === opt.value}
                    onChange={() => handleRadio("timeline", opt.value)}
                    className="h-4 w-4 accent-gold-500"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.timeline && (
              <p className="mt-2 text-xs text-red-500 font-sans">
                {errors.timeline}
              </p>
            )}
          </fieldset>

          <div className="pt-1">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                id="tcpaConsent"
                checked={tcpaConsent}
                onChange={(e) => {
                  setTcpaConsent(e.target.checked);
                  if (e.target.checked) setTcpaError(false);
                }}
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold-500"
                aria-describedby={tcpaError ? "tcpa-error" : undefined}
              />
              <span className="text-xs text-stone-500 font-sans leading-relaxed">
                By checking this box, I consent to receive calls and text messages
                from Gregg Rossman at the phone number provided, including via automated
                dialing systems, regarding my home valuation request. Message &amp; data
                rates may apply. Consent is not required to receive services.{" "}
                <Link
                  href="/privacy"
                  className="text-gold-600 underline underline-offset-2 hover:text-gold-700"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {tcpaError && (
              <p id="tcpa-error" className="mt-1.5 text-xs text-red-500 font-sans">
                Please review and accept the contact consent above to continue.
              </p>
            )}
          </div>
        </div>
      )}

      {state === "error" && (
        <p className="text-xs text-red-500 font-sans text-center py-1">
          Something went wrong. Please try again or call directly.
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        {step > 1 && (
          <button
            type="button"
            onClick={goBack}
            disabled={state === "submitting"}
            className="luxury-button-outline flex-1 disabled:opacity-50"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="luxury-button flex-1"
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={state === "submitting"}
            className="luxury-button flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "Submitting…" : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
}
