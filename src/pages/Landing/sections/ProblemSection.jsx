const ProblemSection = () => {
  return (
    <section className="relative w-full py-15 lg:py-20 flex flex-col items-center justify-center overflow-hidden bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">
      
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 dark:opacity-0"
        style={{
          backgroundImage: 'radial-gradient(circle at top center, #FFFFFF 0%, #FAF6F0 50%, #F5EFE5 100%)'
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        <div className="max-w-4xl mx-auto px-5 text-center flex flex-col items-center">
          {/* Fading Vertical Divider */}
          <div className="w-px h-20 md:h-28 bg-linear-to-b from-transparent via-brand-orange/40 to-brand-orange/80 mt-16 mb-12"></div>
          
          {/* Main Heading Block */}
          <h2 className="text-[2rem] md:text-[3.25rem] font-serif text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[1.15] tracking-tight">
            What if your kind of people <br className="hidden md:block" />
            are three campuses away — <br />
            and there is <span className="text-brand-orange italic font-light">no way to discover them?</span>
          </h2>

          {/* Sub-heading Block */}
          <div className="mt-10 space-y-2 md:space-y-3 text-base md:text-[1.35rem] font-serif text-[#333333] dark:text-gray-300 transition-colors duration-300 leading-snug">
            <p>
              What if the event you'd love is happening <span className="text-brand-orange italic font-light">right now</span> <br className="hidden md:block" />
              at a school <span className="text-brand-orange italic font-light">you've never heard of?</span>
            </p>
            <p>
              What if your next collaborator, client, or partner <br className="hidden md:block" />
              is already out there — <span className="text-brand-orange italic font-light">just invisible to you?</span>
            </p>
          </div>

          {/* Fading Vertical Divider */}
          <div className="w-px h-20 md:h-28 bg-linear-to-b from-transparent via-brand-orange/40 to-brand-orange/80 mt-16 mb-12"></div>

        </div>

        {/* Stats Section */}
        <div className="w-full max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-5xl md:text-7xl font-bold text-brand-orange tracking-tighter mb-4">
                4M+
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                Students earning nothing <br /> from their skills
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-5xl md:text-7xl font-bold text-brand-orange tracking-tighter mb-4">
                73%
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                Want to monetize <br /> their talent right now
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-5xl md:text-7xl font-bold text-brand-orange tracking-tighter mb-4">
                0
              </h3>
              <p className="text-[9px] md:text-[11px] text-[#8C857B] dark:text-gray-400 transition-colors duration-300 uppercase tracking-[0.2em] font-semibold leading-relaxed max-w-45">
                Platforms built <br /> for campus-to-campus
              </p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-start">
              <h3 className="text-5xl md:text-7xl font-bold text-brand-orange tracking-tighter mb-4">
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