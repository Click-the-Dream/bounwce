import { FiEye, FiAward } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
import { SlUserFollowing } from "react-icons/sl";
import { momentImage } from "../assets/images";
import { useModal } from "../context/ModalContext";

const CampusStageSection = () => {
  const { openModal } = useModal();
  const features = [
    {
      icon: <FiEye size={20} />,
      title: "The school feed",
      description: "A social feed that shows your school. Post moments, follow classmates, see what's trending right where you are."
    },
    {
      icon: <SlUserFollowing size={20} />,
      title: "Follow your school",
      description: "Build your school presence. Follow people, get followed back. The feed surfaces the students shaping culture at your school — not algorithms built for everyone else."
    },
    {
      icon: <FaStore size={20} />,
      title: "Storeftonts for anyone",
      description: "Make your business as visible as you with an automated storefront from your profile. Food, clothes, services — listed and discovered on the same feed your followers already scroll. Commerce grows from community."
    },
    {
      icon: <FiAward size={20} />,
      title: "The Quad",
      description: "Explore the exclusive features of your school alone"
    }
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-[#f5f4ef] dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">        
       
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-16 items-center">
          
          {/* Left Column: Framed Image Card */}
          <div className="relative w-full flex flex-col lg:max-w-none shadow-2xl dark:shadow-brand-orange/5 transition-shadow duration-300">
              
              <img 
                src={momentImage} 
                alt="school moments image" 
                className="w-full h-[270px] xl:h-[500px] object-cover"
              />
              
              <div className="bg-brand-orange p-6 md:p-8 shrink-0">
                <h3 className="text-white text-md sm:text-lg md:text-xl font-bebas tracking-[0.1rem] uppercase mb-1.5">
                  The social app your school actually needs
                </h3>
                <p className="text-white/80 text-xs md:text-sm font-medium flex items-center gap-2">
                  Early waitlist <span>&rarr;</span> <button className="cursor-pointer hover:-translate-y-1 transition-all duration-300" onClick={openModal}>Join us</button>
                </p>
              </div>
          </div>

          {/* Right Column: Copy & Features List */}
          <div className=" flex flex-col justify-center lg:py-4">
            
            {/* Kicker */}
            <span className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4">
              What Bouwnce is
            </span>

            {/* Main Headline */}
            <h2 className="font-bebas text-4xl lg:text-6xl font-black uppercase text-[#1A1A1A] dark:text-white mb-12 transition-colors duration-300">
              Your school.<br />
              Social and commerce.<br />
              Built in.
            </h2>

            {/* Features List */}
            <div className="w-full space-y-3 md:space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-5">
                  
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-md bg-[#f8e7df] dark:bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0 border border-brand-orange/10 dark:border-brand-orange/20 shadow-sm transition-colors duration-300">
                    {feature.icon}
                  </div>

                  {/* Feature Text */}
                  <div className="pt-1">
                    <h4 className="text-[#1A1A1A] font-bebas dark:text-gray-100 text-sm md:text-base font-black uppercase tracking-wide transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-[#595550] dark:text-gray-400 text-[10px] md:text-[12px] leading-relaxed transition-colors duration-300">
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