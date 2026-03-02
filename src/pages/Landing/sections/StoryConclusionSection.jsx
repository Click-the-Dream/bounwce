const StoryConclusionSection = () => {
  return (
    <section className="relative w-full py-10 md:py-16 flex flex-col items-center justify-center bg-[#f0e4d0] dark:bg-neutral-950 transition-colors duration-300 overflow-hidden">
      
      {/* Top Vertical Fading Line */}
      <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent to-brand-orange/60 mb-8 md:mb-12"></div>

      {/* Main Content Wrapper */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center px-5 py-10 md:py-16">
        
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
          <span className="text-[3rem] md:text-[9rem] lg:text-[12rem] font-black uppercase text-[#EBDACD] dark:text-neutral-900 opacity-70 tracking-tighter mix-blend-multiply dark:mix-blend-normal transition-colors duration-300">
            BOUWNCE
          </span>
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center font-serif text-[1.1rem] md:text-2xl lg:text-[1.65rem] text-[#262626] dark:text-gray-200 transition-colors duration-300 leading-relaxed md:leading-[1.6]">
          
          <div className="space-y-1 md:space-y-2 font-medium">
            <p>Kofi's next client is at a campus he's never visited.</p>
            <p>Zara's collaborator is already looking for her.</p>
            <p>Jalen's people are already online.</p>
            <p>Marcus's voice has no borders.</p>
          </div>
          
          <p className="text-brand-orange italic font-light pt-8 md:pt-10 text-xl md:text-3xl">
            They just needed a way to find each other.
          </p>

          <p className="pt-10 md:pt-14 text-lg md:text-2xl font-medium tracking-wide">
            That's Bouwnce.
          </p>
          
        </div>
      </div>

      {/* Bottom Vertical Fading Line */}
      <div className="w-px h-16 md:h-20 bg-gradient-to-t from-transparent to-brand-orange/60 mt-8 md:mt-12"></div>

    </section>
  );
};

export default StoryConclusionSection;