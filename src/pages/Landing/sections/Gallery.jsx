import { everyCampus, oneCampus } from "../assets/images";

const Gallery = () => {

    return (
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
                    <h2 className="text-white font-bebas text-4xl lg:text-6xl leading-[61px] font-black uppercase mb-6">
                        One Campus.<br />
                        One Bubble.<br />
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
                    <h2 className="text-white font-bebas text-4xl lg:text-6xl leading-[61px] font-black uppercase mb-6">
                        Every Campus.<br />
                        One Universe.<br />
                        Infinite Access.
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg font-medium max-w-md leading-relaxed">
                        Your profile visible to thousands across every campus on the network, from day one.
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Gallery;