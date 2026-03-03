import { yourMoments } from "../assets/images";
import { useModal } from "../context/ModalContext";

const FinalCTASection = () => {
  const { openModal } = useModal();
  // Array to quickly map out the overlapping avatar images
  const avatars = [
    "https://i.pravatar.cc/100?img=33",
    "https://i.pravatar.cc/100?img=47",
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=64",
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300 flex justify-center px-5">
      
      {/* The Main Card Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-brand-orange/5 transition-all duration-300 rounded-sm overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* LEFT COLUMN: Image & Gradient */}
        <div className="relative w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
          
          {/* Background Image */}
          <img 
            src={yourMoments} 
            alt="Your moment is now image" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/95 via-brand-orange/80 to-black/80 z-10"></div>

          {/* Text Content */}
          <div className="relative z-20">
            <h2 className="text-white font-bebas text-4xl lg:text-6xl leading-[61px] font-black uppercase mb-5">
              YOUR <br />
              MOMENT <br />
              IS NOW.
            </h2>
            <p className="text-white/90 text-[13px] md:text-sm font-medium leading-relaxed max-w-xs">
              Early members get first access, founding perks, and the chance to shape what Bouwnce becomes. The doors open once.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Form & Social Proof */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-white dark:bg-neutral-900 transition-colors duration-300">
          
          <div className="max-w-sm">
            {/* Kicker */}
            <p className="text-brand-orange text-[9px] font-bold uppercase tracking-[0.2em] mb-2">
              Secure Your Spot
            </p>

            {/* Heading */}
            <h2 className="font-bebas text-4xl lg:text-6xl leading-[61px] font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 mb-4">
              Join The <br />
              Waitlist
            </h2>

            {/* Subtext */}
            <p className="text-[#595550] dark:text-gray-400 transition-colors duration-300 text-[13px] leading-relaxed mb-8 font-medium">
              Space is limited. Be one of the first students to access the campus universe when we launch.
            </p>

            {/* The CTA Button */}
            <button 
              className="w-full bg-brand-orange hover:bg-[#e64a19] text-white text-xs md:text-sm font-bold uppercase tracking-wider py-4 rounded-sm shadow-xl shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5"
              onClick={openModal}
            >
              I Want Early Access
            </button>
            
            {/* Disclaimer */}
            <p className="text-[10px] text-gray-400 dark:text-gray-500 transition-colors duration-300 mt-3 text-left flex items-center gap-2">
              <span className="text-gray-300 dark:text-gray-600">—</span> No spam. Just your invite when we launch.
            </p>

            {/* Social Proof: Avatars & Count */}
            <div className="flex items-center gap-12 md:gap-3 mt-10">
              
              {/* Overlapping Avatars */}
              <div className="flex -space-x-2.5">
                {avatars.map((src, index) => (
                  <img 
                    key={index}
                    src={src} 
                    alt={`Waitlist member ${index + 1}`} 
                    className="w-7 h-7 rounded-full border-[1.5px] border-white dark:border-neutral-900 transition-colors duration-300 object-cover shadow-sm relative"
                    style={{ zIndex: avatars.length - index }} 
                  />
                ))}
              </div>

              {/* Count Text */}
              <p className="text-[11px] text-[#595550] dark:text-gray-400 transition-colors duration-300">
                <span className="font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">3,089 students</span> already on the list.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;