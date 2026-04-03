import { useState } from "react";
import BouwnceDemo from '../../../features/BouwnceDemo';

const STEPS = [
    {
        id: 1,
        title: "Find Exactly What You Need",
        description: `Where can I buy a vintage leather jacket?" Spotter knows local inventory and will point you straight to the stores that have it in stock.`,
    },
    {
        id: 2,
        title: "Discover Experiences",
        description: "Stop guessing where to go. Tell us what you want, and we'll point you to the local favorites that match your request perfectly.",
    },
    {
        id: 3,
        title: "Meet a Friend",
        description: "Surface the places that are best for buying, easiest for meeting up, and strongest overall.",
    },
    {
        id: 4,
        title: "Surface options your team can trust",
        description: "A single view shows which places are best for meeting up, which are best for buying, and which are strongest overall.",
    },
];

const AboutSection = () => {
    const [activeStep, setActiveStep] = useState(1); // default first active

    return (
        <section className="relative flex flex-col items-center bg-white dark:bg-neutral-950 transition-colors duration-300">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center min-h-[1000px] SFPro">

                {/* Left */}
                <div className="flex flex-col justify-center space-y-12 bg-[#F9F9F9] max-w-[502px] h-full p-10">

                    <header className="space-y-4">
                        <h2 className="text-xl lg:text-[25px] font-bold leading-[1.05] tracking-tight text-black Aeonik">
                            Find the Perfect Picks for Every <br /> Occasion and Match with Friends.
                        </h2>
                        <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl pompiere">
                            Bouwnce gives you curated recommendations for every occasion and helps you match effortlessly with friends.
                        </p>
                    </header>

                    {/* Timeline */}
                    <div className="relative space-y-8">
                        <div className="absolute left-[13px] top-10 bottom-10 w-[1px] bg-[#C9C9C9]" />

                        {STEPS.map((step) => {
                            const isActive = activeStep === step.id;

                            return (
                                <div
                                    key={step.id}
                                    onMouseEnter={() => setActiveStep(step.id)}
                                    className="relative flex gap-4 cursor-pointer"
                                >
                                    {/* Number */}
                                    <div className="relative flex flex-col items-center flex-shrink-0 pt-1">
                                        <div
                                            className={`w-7 h-7 flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive
                                                ? "bg-[#FF4B2B] text-white scale-110"
                                                : "bg-[#C9C9C9] text-[#949494]"
                                                }`}
                                        >
                                            {step.id}
                                        </div>

                                        {isActive && step.id !== STEPS.length && (
                                            <div className="w-[1px] h-24 bg-[#FF4B2B] -mb-20 transition-all duration-300" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-1.5 flex-1">
                                        <h3
                                            className={`text-sm tracking-tight transition-colors duration-300 text-black ${isActive ? "font-medium" : "font-normal"
                                                }`}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-[13px] text-[#949494] leading-relaxed max-w-lg">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right */}
                <div className='p-6 rounded-[30px] bg-[#F7F7F7]'>
                    <BouwnceDemo activeStep={activeStep} />
                </div>

            </div>
        </section>
    );
};

export default AboutSection;