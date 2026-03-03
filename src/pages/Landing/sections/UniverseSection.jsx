import { findPeople, turnHustle, discoverEvents, connect, buildReputation } from "../assets/images";
import { FaUser, FaSearch, FaHeart } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

const UniverseSection = () => {
  const gridItems = [
    {
      id: 1,
      imgSrc: findPeople,
      alt: "Student laughing and working",
      hoverText: "find your people across campuses",
      gridClass: "col-span-2 row-span-2 min-h-[300px] md:min-h-full"
    },
    {
      id: 2,
      imgSrc: turnHustle,
      alt: "Hands stacked together",
      hoverText: "turn your hustle into income",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 3,
      imgSrc: discoverEvents,
      alt: "Lecture or event",
      hoverText: "discover events near you",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 4,
      imgSrc: connect,
      alt: "Two students laughing at laptop",
      hoverText: "connect, collab, create.",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 5,
      imgSrc: buildReputation,
      alt: "Hands typing on laptop",
      hoverText: "build reputation that travels",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    }
  ];

  const steps = [
    {
      id: "01",
      icon: <FaUser />,
      title: "BUILD YOUR PROFILE",
      description: "Your skills, your work, your voice. Visible across every campus from day one."
    },
    {
      id: "02",
      icon: <FaSearch />,
      title: "DISCOVER YOUR SCENE",
      description: "Students, events, gigs, and communities across campuses. Your world expands immediately."
    },
    {
      id: "03",
      icon: <FaHeart />,
      title: "CONNECT & SHARE",
      description: "Link with creatives, hustlers, builders and influencers who match your energy. No more silos."
    },
    {
      id: "04",
      icon: <FaSackDollar />,
      title: "EARN & GROW",
      description: "Pick up gigs. Collect reviews. Build a reputation that matters — and pays."
    }
  ];

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 bg-[#F5EFE5] dark:bg-neutral-900 transition-colors duration-300 pb-20">
        
        {/* Header Block */}
        <div className="mb-10">
          <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] pt-10 pb-2">
            Campus Life, Amplified
          </p>
          <h2 className="text-[2rem] lg:text-[3rem] font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[0.85] tracking-tighter mb-15">
            This is your <br />
            universe now.
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-2 md:gap-3 w-full h-auto md:h-[25rem] lg:h-[35rem]">
          
          {gridItems.map((item) => (
            <div 
              key={item.id} 
              className={`relative overflow-hidden group cursor-pointer bg-black ${item.gridClass}`}
            >
              <img 
                src={item.imgSrc} 
                alt={item.alt} 
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-[12px] md:text-sm font-black uppercase tracking-tighter transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {item.hoverText}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      <div className="pt-15 lg:pt-20 max-w-7xl mx-auto px-5 lg:px-10 bg-[#f2ede5] dark:bg-neutral-950 transition-colors duration-300">
          
          {/* Header Block */}
          <div className="mb-12">
            <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Getting Started
            </p>
            <h2 className="text-[2rem] lg:text-[3rem] font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[0.9] tracking-tighter">
              Four Steps To<br className="hidden md:block" />
              Your Universe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-[#E8E0D5] dark:border-neutral-800 lg:border-none divide-y lg:divide-y-0 lg:divide-x divide-[#E8E0D5] dark:divide-neutral-800 transition-colors duration-300">
            
            {/* Steps map */}
            {steps.map((step) => (
              <div 
                key={step.id} 
                className="group relative px-6 py-10 lg:p-10 transition-colors duration-300 ease-in-out hover:bg-[#FFF0EB] dark:hover:bg-brand-orange/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                {/* 7. BIG NUMBERS */}
                <span className="text-5xl font-black text-[#F3D5CE] dark:text-neutral-500 transition-colors duration-300 tracking-tighter block mb-3">
                  {step.id}
                </span>

                <div className="text-2xl my-6 text-brand-orange">
                  {step.icon}
                </div>

                {/* 8. TITLE */}
                <h3 className="text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300 text-[15px] font-black uppercase tracking-wide mb-3">
                  {step.title}
                </h3>

                {/* 9. DESCRIPTION */}
                <p className="text-[#8C857B] dark:text-gray-400 transition-colors duration-300 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
                
              </div>
            ))}
            
          </div>

        </div>
    </section>
  );
};

export default UniverseSection;