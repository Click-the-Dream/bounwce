const ProblemSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">

      {/* <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 dark:opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle at top center, #FFFFFF 0%, #FAF6F0 50%, #F5EFE5 100%)'
        }}
      /> */}

      <div className="relative z-10 w-full flex flex-col items-center">

        <div className="max-w-4xl mx-auto px-5 text-center flex flex-col items-center">
          {/* Fading Vertical Divider */}
          {/* <div className="w-[1px] h-24 md:h-32 bg-gradient-to-b from-transparent via-brand-orange/50 to-transparent mb-10 my-16"></div> */}

          {/* Main Heading Block */}
          <h2 className="text-[32px] lg:text-[50px] font-instrument text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[1.15] tracking-tight">
            What if your school had its own social feed — where you catch up with <br className="hidden md:block" />
             <span className="text-brand-orange italic font-light">every moments, every story, every gist?</span>
          </h2>

          {/* Sub-heading Block */}
          <div className="mt-10 space-y-2 md:space-y-3 text-[clamp(20px,2.6vw,34px)] font-instrument text-[#333333] dark:text-gray-300 transition-colors duration-300 leading-snug">
            <p>
              What if the girl selling the <span className="text-brand-orange italic font-light">best bakes and treat</span> <br className="hidden md:block" />had a storefront everyone could find?
            </p>
            <p>
              What if the thrift vendor, the hair stylist, the food vendor could reach more people <br className="hidden md:block" />
              <span className="text-brand-orange italic font-light">than their contact list? </span>
            </p>
          </div>

          {/* Fading Vertical Divider */}
          <div className="w-[1px] h-24 md:h-32 bg-gradient-to-b from-transparent via-brand-orange/50 to-transparent mb-10 my-16"></div>

        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto px-5 w-full pb-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 text-center">

          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center">
            <h3 className="text-[3rem] md:text-6xl font-bebas text-brand-orange uppercase mb-3">
              8 IN 10
            </h3>
            <p className="text-[10px] text-[#8C857B] dark:text-gray-400 tracking-[0.2em] uppercase max-w-[220px] leading-relaxed">
              School vendors selling only via whatsapp
            </p>
          </div>

          {/* Stat 2 */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-[3rem] md:text-6xl font-bebas text-brand-orange uppercase mb-3">
              73%
            </h3>
            <p className="text-[10px] text-[#8C857B] dark:text-gray-400 tracking-[0.2em] uppercase max-w-[160px] leading-relaxed">
              Students want to buy from school vendors
            </p>
          </div>

          {/* Stat 3 */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-[3rem] md:text-6xl font-bebas text-brand-orange uppercase mb-3">
              0
            </h3>
            <p className="text-[10px] text-[#8C857B] dark:text-gray-400 tracking-[0.2em] uppercase max-w-[160px] leading-relaxed">
              Social apps built for school commerce
            </p>
          </div>

          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center">
            <h3 className="text-[3rem] md:text-6xl font-bebas text-brand-orange uppercase mb-3">
              1
            </h3>
            <p className="text-[10px] text-[#8C857B] dark:text-gray-400 tracking-[0.2em] uppercase max-w-[220px] leading-relaxed">
              One platform about to change it all
            </p>
          </div>

        </div>
      </div>

      </div>
    </section>
  );
};

export default ProblemSection;
