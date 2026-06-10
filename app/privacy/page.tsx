import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Gregg Rossman",
  description: "Privacy Policy for Gregg Rossman Luxury Home Valuation.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-cream-100 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-px bg-gold-500 mb-8" />
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm font-sans mb-12">
            Effective Date: May 4, 2025
          </p>

          <div className="space-y-10 text-stone-600 font-sans text-sm leading-relaxed">

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">1. Who We Are</h2>
              <p>
                This Privacy Policy applies to the website operated by Gregg Rossman, a licensed Florida
                REALTOR® (FL License #3617329) affiliated with Keller Williams St. Pete, located at
                360 Central Ave Ste 600, St. Petersburg, FL 33701 (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                This policy explains how we collect, use, and protect your personal information when you
                use this site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly through our valuation request form, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property address (street, city, ZIP)</li>
                <li>Property details (bedrooms, bathrooms, square footage)</li>
                <li>Your estimated home value range</li>
                <li>Your selling timeline</li>
              </ul>
              <p className="mt-3">
                We may also collect <strong>partial form data</strong> when you navigate away from the page
                mid-form (including at step transitions) in order to follow up and assist you. By entering
                any information into the form, you acknowledge that partial data may be captured.
              </p>
              <p className="mt-3">
                We automatically collect certain technical data when you visit, including your IP address,
                browser type, device information, pages viewed, and referring URLs, via cookies and
                analytics tools described below.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">3. Cookies & Tracking Technologies</h2>
              <p className="mb-3">
                We use cookies to save your form progress so you can return to it later. These cookies
                are stored locally on your device and expire after 30 days.
              </p>
              <p className="mb-3">
                We use <strong>Google Tag Manager (GTM)</strong> to manage analytics and marketing tags
                on this site, which may include Google Analytics or similar services. These tools collect
                anonymized usage data to help us understand how visitors interact with the site.
              </p>
              <p>
                You may disable cookies in your browser settings. Doing so may affect form functionality
                (e.g., your progress will not be saved between visits).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">4. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contact you regarding your home valuation request by phone, text, or email</li>
                <li>Provide you with a personalized home valuation consultation</li>
                <li>Follow up with real estate information relevant to your property or timeline</li>
                <li>Improve the functionality and performance of this website</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">5. Telephone & Text Message Consent (TCPA)</h2>
              <p className="mb-3">
                By submitting the valuation request form and providing your phone number, you expressly
                consent to receive calls and/or text messages from Gregg Rossman and/or Keller Williams
                St. Pete at the phone number you provide, including calls and texts made using an
                automatic telephone dialing system or prerecorded voice messages, for the purpose of
                following up on your home valuation request.
              </p>
              <p>
                Message and data rates may apply. Consent is not a condition of receiving any real estate
                services. You may opt out at any time by replying STOP to any text message or by contacting
                us directly.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">6. Sharing Your Information</h2>
              <p className="mb-3">We do not sell your personal information. We may share it with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Keller Williams:</strong> as Gregg&rsquo;s affiliated brokerage, for transaction
                  and compliance purposes
                </li>
                <li>
                  <strong>CRM and marketing platforms:</strong> that help us manage and follow up on
                  leads (e.g., email and SMS service providers), subject to their own privacy policies
                </li>
                <li>
                  <strong>Legal or regulatory authorities:</strong> when required by law or to protect
                  our rights
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide real estate
                services, fulfill our legal obligations, and resolve any disputes. If you would like
                your data removed, please contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">8. Your Rights & Choices</h2>
              <p className="mb-3">You may request to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at the information provided in Section 10.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">9. Security</h2>
              <p>
                We take reasonable administrative, technical, and physical measures to protect your
                personal information from unauthorized access, disclosure, or misuse. No method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">10. Contact Us</h2>
              <p className="mb-1">For privacy-related questions or requests, please contact:</p>
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

            <section>
              <h2 className="font-serif text-xl text-charcoal-800 mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The &ldquo;Effective Date&rdquo; at the top
                of this page reflects the date of the most recent revision. Continued use of this site
                after any update constitutes your acceptance of the revised policy.
              </p>
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
