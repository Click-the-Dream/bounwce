import { useState, useEffect, useRef } from "react";
import { studentOne, studentTwo, studentThree, studentFour} from "../assets/images";

const StudentsSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef([]);
  const timerRef = useRef(null);

  // The Scroll Observer Logic
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            
            // Clear any old timers so they don't overlap
            clearTimeout(timerRef.current);
            
            timerRef.current = setTimeout(() => {
              setActiveCard(index);
            }, 2000); 
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current); // Cleanup on unmount
    };
  }, []);

  const students = [
    {
      id: "01",
      badgeFront: "THE social student",
      badgeBack: "THE social student",
      name: "Leemah",
      roleFront: "300L, knows everyone, seen everywhere",
      roleBack: "300L",
      quote: `"I scroll Instagram & TikTok seeing people I'll never meet. I want to see what's actually happening on my school — who's posting, what events are coming, vibe and party"`,
      painPoints: ["No school-only social space", "Misses school events and culture", "Has to ask around to find school people"],
      unlocks: "A school feed showing only her school. Follow classmates. See what's happening in real time. Never miss a school moment again.",
      image: studentOne
    },
    {
      id: "02",
      badgeFront: "THE baker",
      badgeBack: "THE baker",
      name: "Ayoleyi",
      roleFront: "Jollof and small chops - cooking since 200L",
      roleBack: "400L",
      quote: `"Everyone on my floor knows i bake. Three blocks away — nobody. My whole business stops where my WhatsApp contacts end."`,
      painPoints: ["New customers can't find him", "orders come in chaos, no structure", "no way to build reputation beyond his circle"],
      unlocks: "A verified school storefront. She posts on the feed — the whole school sees her food. Orders come in. Reviews build trust she keeps forever.",
      image: studentTwo
    },
    {
     id: "03",
      badgeFront: "THE thrift vendor",
      badgeBack: "THE thrift vendor",
      name: "Francisca",
      roleFront: "Thrifts & vintage fits. Selling since year 1",
      roleBack: "Thrift seller",
      quote: `"I post on my story. 24 hours later it's gone. The best pieces sell to people who happened to be online. Everyone else misses out and I lose buyers."`,
      painPoints: ["Listings disappear after 24 hours", "buyers outside her circle never finds her", "no permanent store to send people to"],
      unlocks: "Post new drops to the school feed. Permanent storefront anyone can visit. school-wide audience — not just people who caught his story in time.",
      image: studentThree
    },
    {
      id: "03",
      badgeFront: "THE gadgets vendor",
      badgeBack: "THE gadgets vendor",
      name: "Bryan",
      roleFront: "School creative. posts everything. sells sometimes",
      roleBack: "Entrepreneur",
      quote: `"I post. People know my brand. But my social life and my hustle are on different apps and nobody connects the two unless I manually send them a link"`,
      painPoints: ["social presence and businesses are disconnected", "followers can't easily become clients", "juggling multiple platforms to do one thing"],
      unlocks: "One school profile. Post content, build clout, flip on a storefront when he's ready. His school following and his business live in the same place.",
      image: studentFour
    }
  ];

  return (
    <>
      <section className="w-full pb-10 lg:pb-0 pt-20 lg:pt-32 bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-[90rem] mx-auto px-5 lg:px-10">

          <div className="mb-16">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Real students. Real Stories
            </p>
            <h2 className="font-bebas text-5xl lg:text-6xl font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 mb-4">
              Built for every <br />
              kind of student.
            </h2>
            <p className="text-lg lg:text-xl font-serif italic text-[#8C857B] dark:text-gray-400 transition-colors duration-300">
              The ones who post. The ones who sell. The ones who buy. The ones who just want to belong.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1">
            {students.map((student, index) => (
              <div
                key={student.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className="relative h-[32rem] md:h-[38rem] xl:h-[34rem] w-full cursor-pointer group overflow-hidden"
                onClick={() => {
                  clearTimeout(timerRef.current);
                  setActiveCard(activeCard === index ? null : index);
                }}

                onMouseEnter={() => {
                  if (window.matchMedia("(max-width: 1024px)").matches) return;
                  clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(() => setActiveCard(index), 2000); 
                }}
                onMouseLeave={() => {
                  if (window.matchMedia("(max-width: 1024px)").matches) return;
                  clearTimeout(timerRef.current);
                  setActiveCard(null);
                }}
              >
                {/* FRONT SIDE (The Image Base) */}
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Front Content (Fades out on hover) */}
                  <div className={`absolute inset-0 z-10 flex flex-col justify-end p-6 transition-opacity duration-500 ${activeCard === index ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="absolute top-0 left-0 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5">
                      {student.badgeFront}
                    </div>
                    <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent absolute inset-x-0 bottom-0 h-1/2 -z-10" />
                    <h3 className="text-white text-3xl font-black uppercase font-bebas mb-1">{student.name}</h3>
                    <p className="text-gray-400 font-serif italic text-[12px]">{student.roleFront}</p>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 z-20 w-full h-full bg-black/60 backdrop-blur-md transition-all duration-500 flex flex-col p-5 md:p-6 border-t-[6px] border-brand-orange overflow-y-auto custom-scrollbar 
                    ${activeCard === index 
                      ? 'opacity-100 translate-y-0 scale-100 blur-none' 
                      : 'opacity-0 translate-y-20 scale-80 blur-sm pointer-events-none'
                    }`}
                >

                  <div className="relative z-10 grow">
                    <p className="text-brand-orange text-[10px] font-bold uppercase tracking-widest mb-2">
                      {student.badgeBack}
                    </p>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tighter mb-1">
                      {student.name}
                    </h3>
                    <p className="text-gray-300 font-serif italic text-xs mb-6">
                      {student.roleBack}
                    </p>

                    <div className="border-l-2 border-brand-orange/60 pl-4 mb-6">
                      <p className="text-gray-200 font-serif italic text-[13px] leading-relaxed">
                        {student.quote}
                      </p>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {student.painPoints.map((point, i) => (
                        <li key={i} className="flex text-[13px] text-gray-300 font-medium">
                          <span className="text-brand-orange mr-2">—</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mt-auto bg-brand-orange/20 border-l-[3px] border-brand-orange p-4">
                    <p className="text-brand-orange text-[9px] font-black uppercase tracking-widest mb-1.5">
                      Bouwnce Unlocks
                    </p>
                    <p className="text-white text-xs font-semibold leading-snug">
                      {student.unlocks}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentsSection;