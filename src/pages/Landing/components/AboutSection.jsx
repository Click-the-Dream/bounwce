import { aboutImage, aboutVector } from '../assets/images';

const AboutSection = () => {
    return (
        <section className="relative p-4 py-10 flex flex-col items-center overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300">
            {/* 1. The Header Arc Section */}
            <div className="relative flex justify-center w-full h-24 md:h-36 bg-center bg-no-repeat bg-[length:93%_90%] md:bg-[length:93%_100%] -top-1"
            >
                {/* style={{
                    backgroundImage: `url(${aboutVector})`,
                    backgroundPosition: "bottom",

                }} */}

                <span className="relative z-10 text-2xl md:text-3xl lg:text-[40px] font-light tracking-[0.2em] text-black uppercase londrina">
                    How bouwnce works
                </span>
            </div>

            {/* 2. Main Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left Column: Copy and UI Placeholders */}
                <div className="flex flex-col space-y-8">
                    <header className="space-y-4">
                        <h2 className="text-3xl lg:text-[40px] leading-[1.1] tracking-tight text-black Aeonik">
                            Curated Recommendations <br /> for Occassions
                        </h2>
                        <p className="text-[25px] text-black leading-[31.5px] max-w-md pompiere">
                            Stop guessing where to go. Tell us what you want, and we'll point
                            you to the local favorites that match your request perfectly.
                        </p>
                    </header>

                    <div className="space-y-4 w-full max-w-md">
                        {/* Input Placeholders */}
                        <div className="h-20 w-full bg-gray-100/80 rounded-[24px] transition-colors hover:bg-gray-200" />
                        <div className="h-20 w-full bg-gray-100/80 rounded-[24px] transition-colors hover:bg-gray-200" />
                    </div>
                </div>

                {/* Right Column: The Squircle Image */}
                <div className="relative flex justify-end rounded-tl-[40px] rounded-bl-[40px]">
                    <div className="relative w-full aspect-[4/5] max-w-md group rounded-tl-[40px] rounded-bl-[40px]">
                        <img
                            src={aboutImage}
                            alt="Occasions"
                            className="w-full h-full object-cover rounded-tl-[40px] rounded-bl-[40px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;