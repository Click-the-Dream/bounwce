import React from "react";
import { heroImg } from "../../../assets";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

const Hero = () => {
    return (
        <div
            className="relative p-2 pb-96 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FCFAF5] dark:bg-neutral-950 transition-colors duration-300 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${heroImg})`,
                backgroundPosition: "bottom",
                backgroundSize: "90%"

            }}
        >
            <Navbar />
            {/* Hero content goes here */}
            <div className="relative mt-10 text-white max-w-[653px] text-center flex flex-col items-center justify-center">
                <h1 className="font-hugePromo text-6xl lg:text-[80px] uppercase text-gray-900 dark:text-white transition-colors duration-300">
                    Find exactly <span className="text-brand-orange">what</span> you <span className="text-brand-orange">need</span>
                </h1>

                <p className="max-w-[500px] mt-4 text-[13px] text-[#4E4E4E]">
                    Describe what you're looking for—a quiet cafe, a vintage store, or a lively bar. bouwnce will instantly recommend the perfect spots nearby.
                </p>

                <SearchBar />
            </div>

        </div>
    );
};

export default Hero;