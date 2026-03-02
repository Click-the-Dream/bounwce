import { useState } from "react";
import { theHustler, theFounder, theMisfit, theVoice, everyCampus, oneCampus } from "../assets/images";

const StudentsSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Student Data
  const students = [
    {
      id: "01",
      badgeFront: "THE HUSTLER",
      badgeBack: "THE SKILLED HUSTLER",
      name: "KOFI A.",
      location: "KNUST — KUMASI, GHANA",
      roleFront: "Graphic Designer · Side hustle since Year 1",
      roleBack: "Designer · KNUST, Ghana",
      quote: `"I've designed for 40 clients. Every one came through WhatsApp. Some paid. Some disappeared. No record. No reputation."`,
      painPoints: [
        "Hard to find serious buyers",
        "No trust or reputation layer",
        "Income is feast or famine"
      ],
      unlocks: "Structured stage, verified reviews, consistent campus income.",
      image: theHustler
    },
    {
      id: "02",
      badgeFront: "THE MISFIT",
      badgeBack: "THE CREATIVE MISFIT",
      name: "ZARA M.",
      location: "UNILAG — LAGOS, NIGERIA",
      roleFront: "Filmmaker · Studying Economics",
      roleBack: "Filmmaker · UNILAG, Nigeria",
      quote: `"I need actors, editors, and set designers for my short film, but everyone in my department just wants to work in a bank."`,
      painPoints: [
        "Trapped in the wrong network",
        "Can't find creative collaborators",
        "Ideas stall without a team"
      ],
      unlocks: "Instant access to vetted creatives across multiple campuses.",
      image: theMisfit
    },
    {
      id: "03",
      badgeFront: "THE BUILDER",
      badgeBack: "THE VISIONARY BUILDER",
      name: "JALEN W.",
      location: "HOWARD UNIVERSITY — D.C., USA",
      roleFront: "CS Student · Aspiring Founder",
      roleBack: "Developer · Howard, USA",
      quote: `"I can code the entire backend, but my UI looks terrible. I know there's a genius designer at another school, but I can't reach them."`,
      painPoints: [
        "Missing complementary skills",
        "Building in a silo",
        "Limited to immediate friends"
      ],
      unlocks: "A cross-campus co-founder and collaborator matchmaking engine.",
      image: theFounder
    },
    {
      id: "04",
      badgeFront: "THE VOICE",
      badgeBack: "THE CULTURE DRIVER",
      name: "MARCUS D.",
      location: "MOREHOUSE COLLEGE — ATLANTA, USA",
      roleFront: "Culture Driver · Campus Everything",
      roleBack: "Promoter · Morehouse, USA",
      quote: `"I throw the biggest events and know everyone. Brands want to reach my audience, but I have no professional way to pitch myself."`,
      painPoints: [
        "High influence, low monetization",
        "No professional portfolio",
        "Brands skip over students"
      ],
      unlocks: "A verifiable metric of influence and direct brand sponsorships.",
      image: theVoice
    }
  ];

  return (
    <>
      <section className="w-full px-10 py-20 lg:py-32 bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-[90rem] mx-auto px-5 lg:px-10">
          
          {/* Header Block */}
          <div className="mb-16">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Different schools. Same story
            </p>
            <h2 className="text-[2rem] lg:text-[3rem] font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 leading-[0.9] tracking-tighter mb-4">
              Meet the students <br />
              Bouwnce was built for<span className="text-brand-orange">.</span>
            </h2>
            <p className="text-xl lg:text-2xl font-serif italic text-[#8C857B] dark:text-gray-400 transition-colors duration-300">
              Tap each card to reveal their story.
            </p>
          </div>

          {/* 3D Flip Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {students.map((student, index) => (
              <div 
                key={student.id}
                className="relative h-[30rem] w-full perspective-[1500px] cursor-pointer group"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setActiveCard(activeCard === index ? null : index)} 
              >
                <div 
                  className={`w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] shadow-lg ${
                    activeCard === index ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  <div className="absolute inset-0 w-full h-full bg-gray-900 [backface-visibility:hidden] overflow-hidden rounded-sm">
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 z-10">
                      {student.badgeFront}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-24 pb-6 px-6 z-10 flex flex-col justify-end">
                      <p className="text-gray-300 text-[9px] uppercase tracking-[0.15em] font-semibold mb-1">
                        {student.location}
                      </p>
                      <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-1">
                        {student.name}
                      </h3>
                      <p className="text-gray-400 font-serif italic text-sm">
                        {student.roleFront}
                      </p>
                    </div>
                  </div>

                  {/* BACK OF CARD*/}
                  <div className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-900 transition-colors duration-300 [backface-visibility:hidden] [transform:rotateY(180deg)] border-t-[6px] border-brand-orange rounded-sm flex flex-col p-6 overflow-hidden">
                    
                    <div className="absolute top-2 right-2 text-8xl font-black text-[#F5EFE5] dark:text-neutral-800 transition-colors duration-300 select-none z-0">
                      {student.id}
                    </div>

                    <div className="relative z-10 grow">
                      <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-2">
                        {student.badgeBack}
                      </p>
                      <h3 className="text-2xl font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 tracking-tighter mb-1">
                        {student.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300 font-serif italic text-xs mb-6">
                        {student.roleBack}
                      </p>

                      <div className="border-l-2 border-brand-orange/40 pl-4 mb-6">
                        <p className="text-[#595550] dark:text-gray-300 transition-colors duration-300 font-serif italic text-[13px] leading-relaxed">
                          {student.quote}
                        </p>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {student.painPoints.map((point, i) => (
                          <li key={i} className="flex text-[13px] text-gray-500 dark:text-gray-400 transition-colors duration-300 font-medium">
                            <span className="text-brand-orange/50 mr-2">—</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 mt-auto bg-[#f8e7df] dark:bg-brand-orange/10 transition-colors duration-300 border-l-[3px] border-brand-orange p-4">
                      <p className="text-brand-orange text-[9px] font-black uppercase tracking-widest mb-1.5">
                        Bouwnce Unlocks
                      </p>
                      <p className="text-[#1A1A1A] dark:text-gray-200 transition-colors duration-300 text-xs font-semibold leading-snug">
                        {student.unlocks}
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Full-Width Split Screen Section */}
      <section className="w-full flex flex-col lg:flex-row h-auto lg:h-[85vh]">
        
        {/* Left Side: Before Bouwnce */}
        <div className="relative w-full lg:w-1/2 min-h-[30rem] lg:min-h-full overflow-hidden group">          
          <img 
            src={oneCampus}
            alt="Isolated students in a library" 
            className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>
          
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 flex flex-col justify-end z-20">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Before Bouwnce
            </p>
            <h2 className="text-white text-3xl lg:text-[3rem] font-black uppercase leading-[0.85] tracking-tighter mb-6">
              One Campus.<br/>
              One Bubble.<br/>
              No Way Out.
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium max-w-md leading-relaxed">
              Your talent locked behind a gate — known only to the people already in the room.
            </p>
          </div>
        </div>

        {/* Right Side: With Bouwnce */}
        <div className="relative w-full lg:w-1/2 min-h-[30rem] lg:min-h-full overflow-hidden group">
          <img 
            src={everyCampus} 
            alt="Students collaborating across campuses" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>
          
          <div className="absolute inset-x-0 bottom-0 p-8 lg:p-16 flex flex-col justify-end z-20">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-4">
              With Bouwnce
            </p>
            <h2 className="text-white text-3xl lg:text-[3rem] font-black uppercase leading-[0.85] tracking-tighter mb-6">
              Every Campus.<br/>
              One Universe.<br/>
              Infinite Access.
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium max-w-md leading-relaxed">
              Your profile visible to thousands across every campus on the network, from day one.
            </p>
          </div>
        </div>

      </section>
    </>
  );
};

export default StudentsSection;