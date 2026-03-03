const WaitlistBanner = () => {
  const items = [
    "Discover Talent",
    "Earn On Campus",
    "Discover Like Minds",
    "Cross-Campus Network",
    "Be Seen · Be Paid · Belong",
    "Isolation → Access",
    "Connect Across Schools",
    "Discover your person",
    "No More Boring School Environment",
    "Yes To Social life",
    "Access is no longer by location",
    "Marketplace with visibility",
    "Amplify Your Influence",
    "Explore"
  ];

  // The avatars array
  const avatars = [
    "https://i.pravatar.cc/100?img=33",
    "https://i.pravatar.cc/100?img=47",
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=64",
  ];
  
  return (
    <section>
      <section 
        className="w-full py-4 overflow-hidden shadow-inner"
        style={{        
          backgroundColor: "#FF4F33",
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(0, 0, 0, 0.06) 24px, rgba(0, 0, 0, 0.06) 48px)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-white font-bold tracking-wider uppercase text-[10px] md:text-sm">
          
          {/* Avatar and Number Group */}
          <div className="flex items-center gap-3">
            
            {/* Overlapping Avatars */}
            <div className="flex -space-x-2.5 drop-shadow-sm">
              {avatars.map((src, index) => (
                <img 
                  key={index}
                  src={src} 
                  alt={`Waitlist member ${index + 1}`} 
                  // Notice the border-[#FF4F33] so it matches the banner background perfectly!
                  className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[1.5px] border-[#FF4F33] object-cover relative"
                  style={{ zIndex: avatars.length - index }} 
                />
              ))}
            </div>

            {/* The highlighted number badge */}
            <span className="bg-black/20 px-4 py-1.5 shadow-sm rounded-sm backdrop-blur-sm">
              3,078
            </span>
          </div>

          <p className="drop-shadow-sm">
            students already on the waitlist. Don't miss the launch.
          </p>
          
        </div>
      </section>

      {/* BOTTOM SCROLLER */}
      {/* <section className="w-full overflow-hidden border-y border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-4 flex items-center relative transition-colors duration-300">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
            width: max-content;
          }
        `}</style>        
        
        <div className="flex animate-scroll hover:[animation-play-state:paused] cursor-default">
          {[...items, ...items].map((text, idx) => (
            <div 
              key={idx} 
              className="flex items-center px-6 text-sm md:text-base font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-300 whitespace-nowrap transition-colors duration-300"
            >
              {text}
              <span className="ml-6 text-brand-orange text-lg">✦</span>
            </div>
          ))}          
        </div>
      </section> */}
    </section>    
  );
};

export default WaitlistBanner;