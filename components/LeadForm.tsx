"use client";

import { useState } from "react";
import { getAttribution, trackEvent, trackMetaPixel } from "@/lib/analytics";
import type { Budget, Timeline, UnitInterest } from "@/lib/lead";

type FormState = "idle" | "submitting" | "error" | "success";

const UNIT_OPTIONS: { value: UnitInterest; label: string }[] = [
  { value: "residence", label: "Residence" },
  { value: "penthouse", label: "Penthouse" },
  { value: "not_sure", label: "Not Sure Yet" },
];

const BUDGET_OPTIONS: { value: Budget; label: string }[] = [
  { value: "under_600k", label: "Under $600K" },
  { value: "600k_1m", label: "$600K–$1M" },
  { value: "1m_2m", label: "$1M–$2M" },
  { value: "2m_plus", label: "$2M+" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string }[] = [
  { value: "ready_now", label: "Ready Now" },
  { value: "3_6_months", label: "3–6 Months" },
  { value: "6_12_months", label: "6–12 Months" },
  { value: "just_exploring", label: "Just Exploring" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unitInterest: UnitInterest | "";
  budget: Budget | "";
  timeline: Timeline | "";
}

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  unitInterest: "",
  budget: "",
  timeline: "",
};

export default function LeadForm({ id }: { id?: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleRadio<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validateStep1() {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    trackEvent("form_step_complete", { form_id: id ?? "lead-form", step });
    setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
    setState("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting" || state === "success") return;

    trackEvent("form_step_complete", { form_id: id ?? "lead-form", step: 3 });
    setState("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "zenith-dmr-landing",
          attribution: getAttribution(),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      trackEvent("lead_submit", { form_id: id ?? "lead-form" });
      trackEvent("generate_lead", { form_id: id ?? "lead-form" });
      trackMetaPixel("Lead", { form_id: id ?? "lead-form" });

      setState("success");
      setStep(3);
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" id={id}>
      {/* Step indicator */}
      {state !== "success" && (
        <>
          <div className="mb-2 flex items-center justify-center gap-2" role="status" aria-live="polite">
            {[1, 2, 3].map((n) => (
              <span key={n} className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium font-sub transition-colors ${
                    step === n
                      ? "bg-zenith-olive text-zenith-cream"
                      : step > n
                        ? "bg-zenith-charcoal text-zenith-cream"
                        : "bg-zenith-cream text-zenith-sand"
                  }`}
                >
                  {n}
                </span>
                {n < 3 && (
                  <span
                    className={`hidden sm:block h-px w-8 ${step > n ? "bg-zenith-olive" : "bg-zenith-cream"}`}
                    aria-hidden
                  />
                )}
              </span>
            ))}
          </div>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zenith-sand font-sub">
            Step {step} of 3
          </p>
        </>
      )}

      {step === 1 && state !== "success" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-600 font-sans">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                className="luxury-input"
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-600 font-sans">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="luxury-input"
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600 font-sans">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              className="luxury-input"
            />
          </div>
        </div>
      )}

      {step === 2 && state !== "success" && (
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-3 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
              Unit Type Interest
            </legend>
            <div className="space-y-2">
              {UNIT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                    form.unitInterest === opt.value
                      ? "border-zenith-olive bg-zenith-olive/10 text-zenith-charcoal"
                      : "border-zenith-cream bg-white text-zenith-charcoal/80 hover:border-zenith-sand"
                  }`}
                >
                  <input
                    type="radio"
                    name="unitInterest"
                    value={opt.value}
                    checked={form.unitInterest === opt.value}
                    onChange={() => handleRadio("unitInterest", opt.value)}
                    className="h-4 w-4 accent-zenith-olive"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
              Budget Range
            </legend>
            <div className="space-y-2">
              {BUDGET_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                    form.budget === opt.value
                      ? "border-zenith-olive bg-zenith-olive/10 text-zenith-charcoal"
                      : "border-zenith-cream bg-white text-zenith-charcoal/80 hover:border-zenith-sand"
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={opt.value}
                    checked={form.budget === opt.value}
                    onChange={() => handleRadio("budget", opt.value)}
                    className="h-4 w-4 accent-zenith-olive"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 block text-xs uppercase tracking-wider text-zenith-sand font-sub">
              Timeline
            </legend>
            <div className="space-y-2">
              {TIMELINE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm font-sans transition-colors ${
                    form.timeline === opt.value
                      ? "border-zenith-olive bg-zenith-olive/10 text-zenith-charcoal"
                      : "border-zenith-cream bg-white text-zenith-charcoal/80 hover:border-zenith-sand"
                  }`}
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={opt.value}
                    checked={form.timeline === opt.value}
                    onChange={() => handleRadio("timeline", opt.value)}
                    className="h-4 w-4 accent-zenith-olive"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {step === 3 && state === "success" && (
        <div className="py-6 text-center">
          <p className="font-serif text-2xl text-zenith-charcoal">Thank You</p>
          <p className="mt-4 text-[15px] leading-relaxed text-zenith-charcoal/70">
            A member of the Falk·Ruvin·Gallagher team will reach out within
            one business day.
          </p>
        </div>
      )}

      {step === 3 && state !== "success" && (
        <div className="py-6 text-center">
          <p className="text-[15px] leading-relaxed text-zenith-charcoal/70">
            Review your information, then submit your request. A member of
            the Falk·Ruvin·Gallagher team will reach out within one business
            day.
          </p>
        </div>
      )}

      {state === "error" && (
        <p className="py-1 text-center text-xs text-red-600 font-sans">
          Something went wrong. Please try again.
        </p>
      )}

      {state !== "success" && (
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              disabled={state === "submitting"}
              className="luxury-button-outline-dark flex-1 disabled:opacity-50"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="button" onClick={goNext} className="luxury-button flex-1">
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={state === "submitting"}
              className="luxury-button flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "submitting" ? "Submitting…" : "Submit"}
            </button>
          )}
        </div>
      )}
    </form>
  );
}
