import { FiEye, FiDollarSign, FiLink, FiAward } from "react-icons/fi";
import { campusUniverse } from "../assets/images";
import { useModal } from "../context/ModalContext";

const CampusStageSection = () => {
  const { openModal } = useModal();
  const features = [
    {
      icon: <FiEye size={20} />,
      title: "Be Seen Across Campuses",
      description: "Your profile reaches students, mentors, and brands at schools you've never visited."
    },
    {
      icon: <FiDollarSign size={20} />,
      title: "Earn With Structure",
      description: "Real gigs. Real reviews. Real income — not WhatsApp negotiations or ghosted clients."
    },
    {
      icon: <FiLink size={20} />,
      title: "Connect Across Schools",
      description: "Find collaborators, communities, and events at any campus — not just your own bubble."
    },
    {
      icon: <FiAward size={20} />,
      title: "Build A Rep That Lasts",
      description: "Verifiable reputation that compounds and opens doors long before graduation."
    }
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-[#f5f4ef] dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">        
       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center lg:items-stretch">
          
          {/* Left Column: Framed Image Card */}
          <div className="relative w-full h-full flex flex-col max-w-md mx-auto lg:max-w-none shadow-2xl dark:shadow-brand-orange/5 transition-shadow duration-300">
              
              <img 
                src={campusUniverse} 
                alt="campus universe image" 
                className="w-full min-h-[350px] lg:min-h-[500px] grow object-cover"
              />
              
              <div className="bg-brand-orange p-6 md:p-8 shrink-0">
                <h3 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wide mb-1.5">
                  The Campus Universe Is Opening.
                </h3>
                <p className="text-white/80 text-xs md:text-sm font-medium flex items-center gap-2">
                  Early waitlist <span>&rarr;</span> <button className="cursor-pointer hover:-translate-y-1 transition-all duration-300" onClick={openModal}>Join us</button>
                </p>
              </div>
          </div>

          {/* Right Column: Copy & Features List */}
          <div className="flex flex-col justify-center lg:py-8">
            
            {/* Kicker */}
            <span className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
              What Bouwnce Does
            </span>

            {/* Main Headline */}
            <h2 className="font-bebas text-4xl lg:text-6xl md:leading-[61px] font-black uppercase text-[#1A1A1A] dark:text-white mb-12 transition-colors duration-300">
              Your Campus.<br />
              Your Stage.<br />
              Your Economy.
            </h2>

            {/* Features List */}
            <div className="space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-5">
                  
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-md bg-[#f8e7df] dark:bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 border border-brand-orange/10 dark:border-brand-orange/20 shadow-sm transition-colors duration-300">
                    {feature.icon}
                  </div>

                  {/* Feature Text */}
                  <div className="pt-1">
                    <h4 className="text-[#1A1A1A] dark:text-gray-100 text-sm md:text-base font-black uppercase tracking-wide mb-1.5 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-[#595550] dark:text-gray-400 text-[10px] md:text-[12px] leading-relaxed font-medium max-w-md transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CampusStageSection;