const ProblemSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 dark:opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle at top center, #FFFFFF 0%, #FAF6F0 50%, #F5EFE5 100%)'
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">

        <div className="max-w-4xl mx-auto px-5 text-center flex flex-col items-center">
          {/* Fading Vertical Divider */}
          <div className="w-px h-20 bg-linear-to-b from-transparent via-brand-orange/40 to-brand-orange/80 mb-[12px]"></div>

          {/* Main Heading Block */}
          <h2 className="text-[2rem] md:text-[3rem] font-serif text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[1.15] tracking-tight">
            What if your school had its own social feed — where you catch up with <br className="hidden md:block" />
             <span className="text-brand-orange italic font-light">every moments, every story, every gist?</span>
          </h2>

          {/* Sub-heading Block */}
          <div className="mt-10 space-y-2 md:space-y-3 text-base md:text-[1.35rem] font-serif text-[#333333] dark:text-gray-300 transition-colors duration-300 leading-snug">
            <p>
              What if the girl selling the <span className="text-brand-orange italic font-light">best jollof in school</span> <br className="hidden md:block" />had a storefront everyone could find?
            </p>
            <p>
              What if the thrift vendor, the hair stylist, the food vendor could reach more people <br className="hidden md:block" />
              <span className="text-brand-orange italic font-light">than their contact list? </span>
            </p>
          </div>

          {/* Fading Vertical Divider */}
          <div className="w-px h-20 md:h-28 bg-linear-to-b from-transparent via-brand-orange/40 to-brand-orange/80 mt-[16px] mb-[12px]"></div>

        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl mx-auto px-5 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 text-center">

            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-3xl md:text-5xl font-bold text-brand-orange tracking-tighter mb-4">
                8 in 10
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                school vendors selling
                <br />only via WhatsApp
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-3xl md:text-5xl font-bold text-brand-orange tracking-tighter mb-4">
                73%
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                students want to buy <br /> from school vendors
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-3xl md:text-5xl font-bold text-brand-orange tracking-tighter mb-4">
                0
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                Social apps built <br /> for school commerce
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-3xl md:text-5xl font-bold text-brand-orange tracking-tighter mb-4">
                1
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                Platform about <br /> to change all of it
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;