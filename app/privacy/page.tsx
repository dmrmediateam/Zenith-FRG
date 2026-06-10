import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Zenith Milwaukee",
  description: "Privacy Policy for Zenith — 701 E Kilbourn Avenue, Milwaukee, WI.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] bg-zenith-cream pt-28 pb-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 h-px w-12 bg-zenith-olive" />
          <h1 className="mb-4 font-serif text-3xl text-zenith-charcoal md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-12 text-sm text-zenith-sand font-sans">
            Effective Date: June 10, 2026
          </p>

          <div className="space-y-10 text-sm leading-relaxed text-zenith-charcoal/80 font-sans">
            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">1. Who We Are</h2>
              <p>
                This Privacy Policy applies to the website for Zenith, a
                residential development located at 701 E Kilbourn Avenue,
                Milwaukee, WI 53202, exclusively marketed by
                Falk·Ruvin·Gallagher, a team affiliated with Keller Williams
                (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                This policy explains how we collect, use, and protect your
                personal information when you use this site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">2. Information We Collect</h2>
              <p className="mb-3">
                We collect information you provide directly through our
                inquiry form, including:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Unit type interest, budget range, and timeline</li>
              </ul>
              <p className="mt-3">
                We automatically collect certain technical data when you
                visit, including your IP address, browser type, device
                information, pages viewed, and referring URLs, via cookies
                and analytics tools described below.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">3. Cookies &amp; Tracking Technologies</h2>
              <p className="mb-3">
                We use Google Tag Manager (GTM), Google Analytics, Microsoft
                Clarity, and the Meta Pixel to understand how visitors
                interact with this site and to measure the performance of our
                advertising.
              </p>
              <p>
                You may disable cookies in your browser settings. Doing so
                may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">4. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Respond to your inquiry about Zenith</li>
                <li>Provide you with information about availability, pricing, and tours</li>
                <li>Improve the functionality and performance of this website</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">5. Telephone &amp; Text Message Consent</h2>
              <p>
                By submitting the inquiry form and providing your phone
                number, you consent to receive calls and/or text messages
                from the Falk·Ruvin·Gallagher team at the phone number you
                provide regarding your inquiry. Message and data rates may
                apply. Consent is not a condition of receiving any real
                estate services. You may opt out at any time by replying
                STOP to any text message or contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">6. Sharing Your Information</h2>
              <p className="mb-3">We do not sell your personal information. We may share it with:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>Falk·Ruvin·Gallagher and Keller Williams:</strong>{" "}
                  for follow-up and compliance purposes
                </li>
                <li>
                  <strong>CRM and marketing platforms:</strong> that help us
                  manage and follow up on inquiries, subject to their own
                  privacy policies
                </li>
                <li>
                  <strong>Legal or regulatory authorities:</strong> when
                  required by law or to protect our rights
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary
                to respond to your inquiry, provide real estate services, and
                fulfill our legal obligations. If you would like your data
                removed, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">8. Your Rights &amp; Choices</h2>
              <p className="mb-3">You may request to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">9. Security</h2>
              <p>
                We take reasonable administrative, technical, and physical
                measures to protect your personal information from
                unauthorized access, disclosure, or misuse. No method of
                transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">10. Contact Us</h2>
              <p className="mb-1">For privacy-related questions or requests, please contact:</p>
              <address className="not-italic space-y-0.5">
                <p><strong>Falk·Ruvin·Gallagher</strong></p>
                <p>Keller Williams</p>
                <p>701 E Kilbourn Ave Sales Center, Milwaukee, WI 53202</p>
              </address>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The
                &ldquo;Effective Date&rdquo; at the top of this page reflects
                the date of the most recent revision.
              </p>
            </section>
          </div>

          <div className="mt-14 border-t border-zenith-sand/20 pt-8">
            <Link
              href="/"
              className="inline-block w-full max-w-xs luxury-button-outline-dark px-10 text-center sm:w-auto"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
