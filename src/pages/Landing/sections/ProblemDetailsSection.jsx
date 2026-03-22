import { theProblem } from "../assets/images";

const ProblemDetailsSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#f0e7d8] dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Editorial Image Card */}
          <div className="relative w-full aspect-[3/3] lg:aspect-[3/2] xl:aspect-[4/5] lg:max-w-none overflow-hidden shadow-2xl dark:shadow-brand-orange/5 transition-shadow duration-300">

            {/* Main Image */}
            <img
              src={theProblem}
              alt="problem image"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top Left Badge */}
            <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 z-10">
              The Problem
            </div>

            {/* Bottom Gradient Overlay & Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 lg:pt-24 pb-6 lg:pb-8 px-6 lg:px-8 z-10 font-bebas">
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase mb-2">
                School life is interesting it's just invisible
              </h3>
              <p className="text-gray-300 font-georgia italic text-[12px] md:text-base">
                "So much happening - and no way to see it."
              </p>
            </div>
          </div>

          {/* Right Column: Copy & Badges */}
          <div className="flex flex-col justify-center">

            {/* Small Kicker */}
            <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">
              The Gap
            </span>

            {/* Main Headline */}
            <h2 className="font-bebas text-4xl lg:text-6xl font-black uppercase text-[#1A1A1A] dark:text-gray-50 mb-6 transition-colors duration-300">
              school LIFE <br />
              HAS NO FEED.<br />
              school MARKET<br />
              HAS NO STRUCTURE.
            </h2>

            <p className="text-lg lg:text-xl font-serif italic text-[#A68A77] dark:text-[#c4a997] leading-snug mb-8 max-w-lg transition-colors duration-300">
              "The best jollof in school. The best gadget dealer. Zero online presence. Just whatsapp contacts"
            </p>

            {/* Body Paragraphs */}
            <div className="text-[#595550] dark:text-gray-400 text-sm md:text-base leading-relaxed space-y-5 mb-10 max-w-xl font-medium transition-colors duration-300">
              <p>
                Every school has a pulse — events, funny moments, conversations, gigs, communities. But there is no social feed that shows only your school.
              </p>
              <p>
                And every school has an economy — food vendors, thrift sellers, hair stylists, service providers. Their entire business runs through DMs and word of mouth. No storefront. No discovery. No trust layer. <br /> <span className="font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">Bouwnce fixes all — in the same platform..</span>
              </p>
            </div>

            {/* Pill Badges Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-2.5">
              <span className="inline-flex items-center px-2 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-[7px] lg:text-xs font-bold tracking-wide transition-colors duration-300">
                No school-only social feed
              </span>
              <span className="inline-flex items-center px-2 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-[7px] lg:text-xs font-bold tracking-wide transition-colors duration-300">
                Whatsapp is not a market
              </span>
              <span className="inline-flex items-center px-2 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-[7px] lg:text-xs font-bold tracking-wide transition-colors duration-300">
                No Vendor discovery
              </span>
              <span className="inline-flex items-center px-2 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-[7px] lg:text-xs font-bold tracking-wide transition-colors duration-300">
                No trust or reviews
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemDetailsSection;