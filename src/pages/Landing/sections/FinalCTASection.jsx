import { useEffect, useState } from "react";
import useWaitlist from "../../../hooks/useWaitlist";
import { avatarFive, avatarFour, avatarOne, avatarThree, avatarTwo, yourMoments } from "../assets/images";
import { useModal } from "../context/ModalContext";

const FinalCTASection = () => {
  const { openModal } = useModal();
  const avatars = [
    avatarOne,
    avatarTwo,
    avatarThree, 
    avatarFour,
    avatarFive
  ];

  const { waitlistUser } = useWaitlist();
  const { data: waitlistData } = waitlistUser;

  // Dynamic metrics based on live waitlist data
    const joinedCount = waitlistData?.total || waitlistData?.data?.length || 0;
    const [animatedCount, setAnimatedCount] = useState(0);

    // Smooth count animation
      useEffect(() => {
        if (joinedCount > 0) {
          let start = 0;
          const duration = 1000;
          const increment = joinedCount / (duration / 16);
    
          const animate = () => {
            start += increment;
            if (start < joinedCount) {
              setAnimatedCount(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setAnimatedCount(joinedCount);
            }
          };
    
          animate();
        }
      }, [joinedCount]);

  return (
    <section className="w-full py-20 lg:py-32 bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300 flex justify-center px-5">
      
      {/* The Main Card Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-brand-orange/5 transition-all duration-300 rounded-sm overflow-hidden flex flex-col xl:flex-row relative z-10">
        
        {/* LEFT COLUMN: Image & Gradient */}
        <div className="relative w-full xl:w-1/2 p-10 lg:p-14 flex flex-col justify-end h-[300px] lg:h-[400px] xl:h-[500px]">
          
          {/* Background Image */}
          <img 
            src={yourMoments} 
            alt="Your moment is now image" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/95 via-brand-orange/80 to-black/80 z-10"></div>

          {/* Text Content */}
          <div className="relative z-20">
            <h2 className="text-white font-bebas text-3xl lg:text-5xl font-black uppercase mb-5">
              YOUR <br />
              school <br />
              online.
            </h2>
            <p className="text-white/90 text-[13px] md:text-sm leading-relaxed">
              The social app your school has been missing. Post, connect, belong — and if you sell, your whole school is already your market.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Form & Social Proof */}
        <div className="w-full xl:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-white dark:bg-neutral-900 transition-colors duration-300">
          
          <div className="">
            {/* Kicker */}
            <p className="text-brand-orange text-[9px] font-bold uppercase tracking-[0.2em] mb-2">
              Secure Your Spot
            </p>

            {/* Heading */}
            <h2 className="font-bebas text-3xl lg:text-5xl font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 mb-4">
              Join The <br />
              Waitlist
            </h2>

            {/* Subtext */}
            <p className="text-[#595550] dark:text-gray-400 transition-colors duration-300 text-[13px] leading-relaxed mb-8">
              Be among the first students on the platform when we launch in your school. Early members get early access and free storefronts for vendors during the pilot.
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
              <span className="text-brand-orange font-bold">—</span> No spam. Just your invite when we launch.
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
                <span className="font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300"><span>{animatedCount}</span> students</span> already on the list.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;