import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Gregg Rossman",
  description: "Terms of Service for Gregg Rossman Luxury Home Valuation.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-cream-100 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-px bg-gold-500 mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal-800 mb-4">
            Terms of Service
          </h1>
          <p className="text-stone-400 text-sm font-sans mb-12">
            Effective Date: May 4, 2025
          </p>

          <div className="space-y-10 text-stone-600 font-sans text-sm leading-relaxed">

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using this website and submitting a valuation request, you agree to
                these Terms of Service. If you do not agree, please do not use this site.
                These Terms apply to all visitors and users of the site operated by Gregg Rossman,
                a licensed Florida REALTOR® (FL License #3617329) affiliated with Keller Williams
                St. Pete, 360 Central Ave Ste 600, St. Petersburg, FL 33701.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">2. Nature of Services</h2>
              <p className="mb-3">
                This website allows you to request a <strong>complimentary home valuation
                consultation</strong> from Gregg Rossman. By submitting a request, you acknowledge:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The valuation provided is a <strong>professional opinion of value</strong> based on
                  current market data and comparable sales. It is <strong>not</strong> a certified
                  appraisal, nor a legally binding property valuation.
                </li>
                <li>
                  Only a licensed and certified real estate appraiser can provide a formal appraisal
                  for lending, legal, or tax purposes.
                </li>
                <li>
                  Any estimate or range discussed is subject to change based on market conditions,
                  property condition, and other factors.
                </li>
                <li>
                  Submitting a valuation request does not create an agency relationship or obligate
                  you to list or sell your home with Gregg Rossman or Keller Williams.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">3. Agent Disclosure</h2>
              <p>
                Gregg Rossman is a licensed real estate salesperson in the State of Florida, operating
                under Keller Williams St. Pete. Under Florida law, real estate agents represent the
                interests of their clients. Submitting this form does not establish a buyer, seller,
                or dual agency relationship. An agency relationship is only formed upon execution of a
                written representation agreement.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">4. Accuracy of Information</h2>
              <p>
                You agree to provide accurate, complete, and truthful information when submitting the
                valuation request form. Providing false or misleading information may result in an
                inaccurate valuation and may affect any subsequent real estate services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">5. Contact & Communication Consent</h2>
              <p className="mb-3">
                By submitting your contact information, you consent to be contacted by Gregg Rossman
                and/or Keller Williams representatives by phone, text message, and/or email regarding
                your home valuation request and related real estate services.
              </p>
              <p>
                See our <Link href="/privacy" className="text-gold-600 hover:text-gold-700 underline underline-offset-2">Privacy Policy</Link> for
                full details on our telephone and text message consent terms (TCPA). You may opt out
                of marketing communications at any time.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">6. No Guarantee of Results</h2>
              <p>
                We make no representation or warranty that the use of our services will result in the
                sale of your property, a specific sale price, or any particular outcome. Real estate
                markets are dynamic and no agent can guarantee a specific result.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">7. Intellectual Property</h2>
              <p>
                All content on this site, including text, images, graphics, and design, is owned by
                or licensed to Gregg Rossman / Keller Williams and is protected by applicable copyright
                and trademark laws. You may not reproduce, distribute, or create derivative works from
                any content on this site without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">8. Third-Party Links & Services</h2>
              <p>
                This site may use or link to third-party services (e.g., Google Maps for address
                autocomplete, analytics providers). We are not responsible for the privacy practices
                or content of third-party services. Your use of any third-party service is subject
                to that party&rsquo;s own terms and privacy policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">9. Limitation of Liability</h2>
              <p className="mb-3">
                To the maximum extent permitted by applicable law, Gregg Rossman and Keller Williams
                shall not be liable for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of this site or reliance on any valuation or information
                provided.
              </p>
              <p>
                Our total liability to you for any claim arising from use of this site shall not exceed
                the amount you paid us in connection with the applicable services (which, for a
                complimentary consultation, is zero).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">10. Disclaimer of Warranties</h2>
              <p>
                This site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without any
                warranties of any kind, express or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose, or non-infringement. We do not
                warrant that the site will be error-free, uninterrupted, or free of viruses or other
                harmful components.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">11. Fair Housing</h2>
              <p>
                Gregg Rossman is committed to the principles of the Fair Housing Act and the Equal
                Opportunity Act. We do not discriminate on the basis of race, color, national origin,
                religion, sex, handicap, familial status, or any other protected class in the sale,
                rental, or financing of housing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                State of Florida, without regard to its conflict of law provisions. Any dispute
                arising under these Terms shall be subject to the exclusive jurisdiction of the
                state and federal courts located in Pinellas County, Florida.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">13. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. The &ldquo;Effective Date&rdquo; at
                the top of this page will be updated accordingly. Continued use of the site after
                any changes constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">14. Contact</h2>
              <p className="mb-1">Questions about these Terms? Contact us:</p>
              <address className="not-italic space-y-0.5">
                <p><strong>Gregg Rossman</strong></p>
                <p>Keller Williams St. Pete</p>
                <p>360 Central Ave Ste 600, St. Petersburg, FL 33701</p>
                <p>FL License #3617329</p>
                <p>
                  <a href="mailto:rossman.gregg@gmail.com" className="text-gold-600 hover:text-gold-700 underline underline-offset-2">
                    rossman.gregg@gmail.com
                  </a>
                </p>
              </address>
            </section>

          </div>

          <div className="mt-14 pt-8 border-t border-stone-200">
            <Link
              href="/"
              className="inline-block luxury-button-outline px-10 max-w-xs w-full sm:w-auto text-center"
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
