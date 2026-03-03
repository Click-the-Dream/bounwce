import theProblemImage from '../assets/images/1_the_problem.JPG'

const ProblemDetailsSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-[#f0e7d8] dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Editorial Image Card */}
          <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none overflow-hidden shadow-2xl dark:shadow-brand-orange/5 transition-shadow duration-300">
            
            {/* Main Image */}
            <img 
              src={theProblemImage} 
              alt="problem image" 
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top Left Badge */}
            <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 z-10">
              The Problem
            </div>

            {/* Bottom Gradient Overlay & Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-8 px-8 z-10">
              <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">
                Talented. Isolated. Invisible.
              </h3>
              <p className="text-gray-300 font-serif italic text-sm md:text-base">
                "The right people just weren't around me."
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
            <h2 className="text-[2rem] lg:text-[3rem] font-black uppercase text-[#1A1A1A] dark:text-gray-50 leading-[0.85] tracking-tight mb-6 transition-colors duration-300">
              The Campus Gate <br />
              Is The Cage.
            </h2>

            {/* Serif Italic Quote */}
            <p className="text-xl lg:text-2xl font-serif italic text-[#A68A77] dark:text-[#c4a997] leading-snug mb-8 max-w-lg transition-colors duration-300">
              "Same talent. Different opportunities — based on nothing but location."
            </p>

            {/* Body Paragraphs */}
            <div className="text-[#595550] dark:text-gray-400 text-sm md:text-base leading-relaxed space-y-5 mb-10 max-w-xl font-medium transition-colors duration-300">
              <p>
                Right now, across campuses you've never visited, students are doing
                extraordinary things. They have no way to reach you. No stage beyond their
                own gate.
              </p>
              <p>
                The campus you attend shouldn't decide the ceiling of your opportunity. But
                right now — <span className="font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">for most students, it does.</span>
              </p>
            </div>

            {/* Pill Badges Section */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wide transition-colors duration-300">
                No cross-campus visibility
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wide transition-colors duration-300">
                No reputation system
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wide transition-colors duration-300">
                No campus income infrastructure
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-orange/20 bg-[#f8e7df] dark:bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-wide transition-colors duration-300">
                Right talent, wrong room
              </span>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProblemDetailsSection;