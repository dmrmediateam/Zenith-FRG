import LeadForm from "./LeadForm";
import CoBrandedLockup from "./CoBrandedLockup";

export default function LeadFormSection() {
  return (
    <section id="contact" className="reveal">
      <div className="grid lg:grid-cols-2">
        {/* Left — pull-quote + lockup */}
        <div className="flex flex-col items-center justify-center bg-zenith-charcoal px-8 py-16 text-center md:px-16 md:py-24">
          <span className="olive-rule mb-8" />
          <p className="font-serif text-3xl italic leading-snug text-zenith-cream md:text-4xl">
            &ldquo;The view, the address, and the lifestyle —
            <br className="hidden md:block" /> finally come together.&rdquo;
          </p>
          <div className="mt-12">
            <CoBrandedLockup variant="expanded" height={56} />
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center bg-zenith-cream px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center">
              <p className="label-tag mb-3">Request Private Information</p>
              <h2 className="font-serif text-3xl text-zenith-charcoal">
                Be First to Know
              </h2>
            </div>
            <LeadForm id="lead-form" />
          </div>
        </div>
      </div>
    </section>
  );
}
