import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Zenith Milwaukee",
  description: "Terms of Service for Zenith — 701 E Kilbourn Avenue, Milwaukee, WI.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] bg-zenith-cream pt-28 pb-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 h-px w-12 bg-zenith-olive" />
          <h1 className="mb-4 font-serif text-3xl text-zenith-charcoal md:text-4xl">
            Terms of Service
          </h1>
          <p className="mb-12 text-sm text-zenith-sand font-sans">
            Effective Date: June 10, 2026
          </p>

          <div className="space-y-10 text-sm leading-relaxed text-zenith-charcoal/80 font-sans">
            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this website and submitting an inquiry,
                you agree to these Terms of Service. If you do not agree,
                please do not use this site. These Terms apply to all
                visitors and users of the site for Zenith, 701 E Kilbourn
                Avenue, Milwaukee, WI 53202, exclusively marketed by
                Falk·Ruvin·Gallagher, Keller Williams.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">2. Nature of This Site</h2>
              <p className="mb-3">
                This website provides general information about the Zenith
                development. By submitting an inquiry, you acknowledge:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>This is not an offering. Prices, availability, and specifications are subject to change without notice.</li>
                <li>Submitting an inquiry does not create an agency relationship or obligate you to purchase a residence.</li>
                <li>Floor plans, renderings, and amenity descriptions are subject to change during development.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">3. Agent Disclosure</h2>
              <p>
                Falk·Ruvin·Gallagher operates under Keller Williams. Under
                Wisconsin law, real estate agents represent the interests of
                their clients. Submitting this form does not establish a
                buyer or seller agency relationship. An agency relationship
                is only formed upon execution of a written representation
                agreement.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">4. Accuracy of Information</h2>
              <p>
                You agree to provide accurate, complete, and truthful
                information when submitting the inquiry form.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">5. Contact &amp; Communication Consent</h2>
              <p>
                By submitting your contact information, you consent to be
                contacted by the Falk·Ruvin·Gallagher team by phone, text
                message, and/or email regarding Zenith and related real
                estate services. See our{" "}
                <Link href="/privacy" className="text-zenith-bronze underline underline-offset-2 hover:text-zenith-olive">
                  Privacy Policy
                </Link>{" "}
                for details. You may opt out of marketing communications at
                any time.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">6. No Guarantee of Results</h2>
              <p>
                We make no representation or warranty regarding final
                pricing, availability, construction timelines, or any
                particular outcome. Information is subject to change without
                notice.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">7. Intellectual Property</h2>
              <p>
                All content on this site, including text, images, graphics,
                video, and design, is owned by or licensed to Zenith and/or
                Falk·Ruvin·Gallagher and is protected by applicable copyright
                and trademark laws.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">8. Third-Party Links &amp; Services</h2>
              <p>
                This site may use or link to third-party services (e.g.,
                Google Maps, Vimeo, analytics providers). We are not
                responsible for the privacy practices or content of
                third-party services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Zenith and
                Falk·Ruvin·Gallagher shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages
                arising from your use of this site.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">10. Fair Housing</h2>
              <p>
                We are committed to the principles of the Fair Housing Act
                and the Equal Opportunity Act. We do not discriminate on the
                basis of race, color, national origin, religion, sex,
                handicap, familial status, or any other protected class in
                the sale, rental, or financing of housing.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Wisconsin, without regard to
                its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">12. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. The
                &ldquo;Effective Date&rdquo; at the top of this page will be
                updated accordingly.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-serif text-xl text-zenith-charcoal">13. Contact</h2>
              <p className="mb-1">Questions about these Terms? Contact us:</p>
              <address className="not-italic space-y-0.5">
                <p><strong>Falk·Ruvin·Gallagher</strong></p>
                <p>Keller Williams</p>
                <p>701 E Kilbourn Ave Sales Center, Milwaukee, WI 53202</p>
              </address>
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
