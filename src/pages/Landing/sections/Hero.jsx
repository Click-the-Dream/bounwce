import { GoDash } from "react-icons/go";
import { useModal } from "../context/ModalContext";
import { useEffect, useState } from "react";
import useWaitlist from "../../../hooks/useWaitlist";
import { avatarFive, avatarFour, avatarOne, avatarThree, avatarTwo } from "../assets/images";
const avatars = [
  avatarOne,
  avatarTwo,
  avatarThree,
  avatarFour,
  avatarFive
];

const Hero = () => {
  const { openModal } = useModal();

  // matrix of 8 columns and 10 rows. 
  const meshPattern = [
    [0, 0, 0, 2, 1, 1, 1, 0],
    [0, 0, 0, 1, 2, 2, 1, 1],
    [0, 0, 0, 2, 2, 1, 1, 1],
    [0, 0, 1, 1, 1, 2, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const { waitlistUser } = useWaitlist();
  const { data: waitlistData,} = waitlistUser;

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
    <section className="relative px-8 py-28 lg:px-14 lg:pl-20 min-h-[80vh] flex items-center overflow-hidden bg-[#FCFAF5] dark:bg-neutral-950 transition-colors duration-300">

      {/* Left: Main Content */}
      <div className="w-full lg:w-1/2 gap-6 space-y-5 relative z-10">
        <p className="flex items-center gap-2 uppercase text-brand-orange text-[10px] font-semibold tracking-wider mt-10">
          {/* <motion.span
            animate={{
              scale: [1, 0.5, 1],
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="block h-2.5 w-2.5 rounded-full bg-brand-orange shrink-0"
          /> */}
          School social. school market. one app
        </p>

        <h1 className="font-bold font-bebas text-6xl lg:text-7xl uppercase text-gray-900 dark:text-white transition-colors duration-300">
          Redifining the campus <span className="text-brand-orange font-instrument uppercase italic font-normal text-6xl lg:text-7xl">Experience</span>
        </h1>

        <p className="text-[12px] lg:text-base text-gray-500 dark:text-gray-400 tracking-wide transition-colors duration-300">
          Share moments students in your school can relate with. Buy from the students in your school. Follow. Connect<br />
          <span className="font-bold block mt-3">And if you sell — your storefront lives right here too</span>
        </p>

        <div className="pt-2">
          <button
            onClick={openModal}
            className="bg-brand-orange hover:opacity-90 transition-opacity text-white px-8 py-3 font-semibold tracking-wide shadow-lg shadow-brand-orange/20"
          >
            Claim My Spot
          </button>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 flex gap-1 items-center font-medium mt-2 transition-colors duration-300">
          <span className="text-brand-orange text-lg">
            <GoDash />
          </span>
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
          <span>{animatedCount}</span>students already waiting
        </div>
      </div>

      {/* Right/Background: 3D Mesh Design */}
      <div className="absolute inset-0 lg:left-auto right-0 top-0 h-full lg:w-[60%] flex items-start justify-end z-0 opacity-20 lg:opacity-100 pointer-events-none perspective-[1500px]">

        <div
          className="relative w-[180%] h-[140%] lg:w-[120%] lg:h-[120%] -top-[10%] -right-[5%] flex items-center justify-center origin-right [transform:rotateY(-25deg)_rotateX(15deg)_rotateZ(2deg)]"
          style={{
            maskImage: 'linear-gradient(to top right, transparent 15%, black 65%)',
            WebkitMaskImage: 'linear-gradient(to top right, transparent 15%, black 65%)'
          }}
        >
          {/* Background Watermark Text */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <span className="text-8xl lg:text-[12rem] font-black text-[#f2e7db] dark:text-neutral-900 transition-colors duration-300 tracking-tighter opacity-70 transform -translate-x-10 lg:-translate-x-24 select-none [transform:translateZ(-50px)]">
              BOUWNCE
            </span>
          </div>

          {/* The Grid */}
          <div className="relative z-10 w-full h-full grid grid-cols-6 lg:grid-cols-8 grid-rows-12 lg:grid-rows-10 gap-1 lg:gap-[2px] p-4 lg:p-0">
            {meshPattern.flat().map((cell, idx) => (
              <div
                key={idx}
                className={`
                  w-full h-full rounded-[1px] transition-colors duration-300
                  ${cell === 1 ? 'bg-[#FFDE9E] shadow-sm' : ''} 
                  ${cell === 2 ? 'bg-[#FA7B5B] shadow-md shadow-[#FA7B5B]/20' : ''}
                  ${cell === 0 ? 'bg-transparent border-[0.5px] border-[#f2e7db]/40 dark:border-neutral-800' : ''}
                `}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
