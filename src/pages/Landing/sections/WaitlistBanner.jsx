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


      {/* BOTTOM SCROLLER */}
      <section className="w-full overflow-hidden border-y border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-4 flex items-center relative transition-colors duration-300">
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 100s linear infinite;
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
      </section>
    </section>
  );
};

export default WaitlistBanner;