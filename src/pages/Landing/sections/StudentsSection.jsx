import { useState } from "react";
import { theHustler, theFounder, theMisfit, theVoice, everyCampus, oneCampus } from "../assets/images";

const StudentsSection = () => {
  const [activeCard, setActiveCard] = useState(null);

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
      painPoints: ["Hard to find serious buyers", "No trust or reputation layer", "Income is feast or famine"],
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
      <section className="w-full px-10 pt-20 lg:pt-32 bg-[#F5EFE5] dark:bg-neutral-950 transition-colors duration-300">
        <div className="max-w-[90rem] mx-auto px-5 lg:px-10">

          <div className="mb-16">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Different schools. Same story
            </p>
            <h2 className="font-bebas text-4xl lg:text-6xl md:leading-[61px] font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 mb-4">
              Meet the students <br />
              Bouwnce was built for<span className="text-brand-orange">.</span>
            </h2>
            <p className="text-xl lg:text-2xl font-serif italic text-[#8C857B] dark:text-gray-400 transition-colors duration-300">
              Hover over each card to reveal their story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {students.map((student, index) => (
              <div
                key={student.id}
                className="relative h-[30rem] w-full cursor-pointer group overflow-hidden"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
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
                    <p className="text-gray-300 text-[9px] uppercase tracking-[0.15em] font-semibold mb-1">{student.location}</p>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-1">{student.name}</h3>
                    <p className="text-gray-400 font-serif italic text-sm">{student.roleFront}</p>
                  </div>
                </div>


                <div
                  className={`absolute inset-0 z-20 w-full h-full bg-black/60 backdrop-blur-md transition-all duration-500 flex flex-col p-6 border-t-[6px] border-brand-orange ${activeCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
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