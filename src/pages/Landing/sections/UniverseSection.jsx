import {  galleryOne, galleryTwo, galleryThree, galleryFour, galleryFive } from "../assets/images";
import { FaUser, FaShoppingCart} from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { SiBookstack } from "react-icons/si";

const UniverseSection = () => {
  const gridItems = [
    {
      id: 1,
      imgSrc: galleryOne,
      alt: "Student laughing and working",
      hoverText: "scroll the school feed, discover what's popping",
      gridClass: "col-span-2 row-span-2 min-h-[300px] md:min-h-full"
    },
    {
      id: 2,
      imgSrc: galleryTwo,
      alt: "Hands stacked together",
      hoverText: "build your campus presence. follow your favorite people's journey",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 3,
      imgSrc: galleryThree,
      alt: "Lecture or event",
      hoverText: "open your storefront, sell to your school",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 4,
      imgSrc: galleryFour,
      alt: "Two students laughing at laptop",
      hoverText: "discover new places and expereiences within your school",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    },
    {
      id: 5,
      imgSrc: galleryFive,
      alt: "Hands typing on laptop",
      hoverText: "order without leaving the app",
      gridClass: "col-span-1 row-span-1 min-h-[200px] md:min-h-full"
    }
  ];

  const steps = [
    {
      id: "01",
      icon: <FaUser />,
      title: "join with your student id",
      description: "Sign up. Get verified. Your school tag is set — every post, every interaction, every sales is rooted in your school from day one."
    },
    {
      id: "02",
      icon: <MdPostAdd />,
      title: "post on your school feed",
      description: "Your campus feed is live the moment you join. Post moments, follow your faves, react to content. This is where campus culture lives — not scattered across Whatsapp status and Instagram stories."
    },
    {
      id: "03",
      icon: <FaShoppingCart />,
      title: "sell & buy",
      description: "Any student can activate a storefront in minutes. List your food, clothes, services, or skills. Your school can now find and buy from you."
    },
    {
      id: "04",
      icon: <SiBookstack />,
      title: "EXPLORE THE QUAD",
      description: "Explore the exclusive features for your school alone."
    }
  ];

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 bg-[#F5EFE5] dark:bg-neutral-900 transition-colors duration-300 pb-20">

        {/* Header Block */}
        <div className="mb-10">
          <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] pt-10 pb-2">
            school life, finally online
          </p>
          <h2 className="font-bebas text-4xl lg:text-5xl font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300 mb-15">
            your school. <br />
            your  feed. <br />
            your market.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-1 w-full h-auto md:h-[25rem] lg:h-[35rem]">

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
                <p className="text-white text-[12px] md:text-sm font-instrument italic transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {item.hoverText}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      <div className="pt-10 lg:pt-15 pb-10 max-w-7xl mx-auto px-5 lg:px-10 bg-[#f2ede5] dark:bg-neutral-950 transition-colors duration-300">

        {/* Header Block */}
        <div className="mb-12">
          <p className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3">
            how it works
          </p>
          <h2 className="font-bebas text-4xl lg:text-5xl font-black uppercase text-[#1A1A1A] dark:text-white transition-colors duration-300">
            Join. Post. <br/>
            connect. <br />
            sell and buy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-b border-[#E8E0D5] dark:border-neutral-800 lg:border-none divide-y lg:divide-y-0 lg:divide-x divide-[#E8E0D5] dark:divide-neutral-800 transition-colors duration-300">

          {/* Steps map */}
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative px-6 py-10 lg:p-10 transition-colors duration-300 ease-in-out bg-[#FFF0EB]/20  hover:bg-[#FFF0EB] dark:hover:bg-brand-orange/10"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              {/* 7. BIG NUMBERS */}
              {/* <span className="text-5xl font-black text-[#F3D5CE] dark:text-neutral-500 transition-colors duration-300 tracking-tighter block mb-3">
                  {step.id}
                </span> */}

              <div className="text-2xl mb-6 text-brand-orange">
                {step.icon}
              </div>

              {/* 8. TITLE */}
              <h3 className="text-[#1A1A1A] dark:text-gray-100 font-bebas transition-colors duration-300 text-[18px] font-black uppercase mb-3 tracking-[1px]">
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