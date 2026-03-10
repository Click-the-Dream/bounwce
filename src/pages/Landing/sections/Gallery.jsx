import { oneCampus, withBouwnce } from "../assets/images";

const Gallery = () => {
    return (
        // 1. MAIN CONTAINER:
        <section className="w-full flex flex-col xl:flex-row h-auto xl:h-[85vh]">

            {/* Left Side: Before Bouwnce */}
            <div className="relative w-full xl:w-1/2 aspect-video xl:aspect-auto xl:min-h-full overflow-hidden group">
                <img
                    src={oneCampus}
                    alt="Isolated students in a library"
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>

                <div className="absolute inset-x-0 bottom-0 p-4 pt-12 xl:p-16 flex flex-col justify-end z-20">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 lg:mb-4">
                        Before Bouwnce
                    </p>
                    <h2 className="text-white font-bebas text-3xl lg:text-5xl font-black uppercase mb-2 lg:mb-6">
                        same schools.<br />
                        strangers.<br />
                        online.
                    </h2>
                    <p className="text-gray-300 text-[10px] md:text-sm max-w-md leading-snug lg:leading-relaxed">
                        You scroll a feed that doesn't know you exist. Hundreds of students around you — invisible, disconnected, no shared space.
                    </p>
                </div>
            </div>

            {/* Right Side: With Bouwnce */}
            <div className="relative w-full xl:w-1/2 aspect-video xl:aspect-auto xl:min-h-full overflow-hidden group">
                <img
                    src={withBouwnce}
                    alt="Students collaborating across campuses"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10"></div>

                <div className="absolute inset-x-0 bottom-0 p-4 pt-12 xl:p-16 flex flex-col justify-end z-20">
                    <p className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.2em] mb-2 lg:mb-4">
                        With Bouwnce
                    </p>
                    <h2 className="text-white font-bebas text-3xl lg:text-5xl font-black uppercase mb-2 lg:mb-6">
                        your feed.<br />
                        your people.<br />
                        your market.
                    </h2>
                    <p className="text-gray-300 text-[10px] md:text-sm max-w-md leading-snug lg:leading-relaxed">
                        A social feed that only knows your school. Follow, post, connect — and when someone sells, you can buy without ever leaving.
                    </p>
                </div>
            </div>

        </section>
    )
}

export default Gallery;