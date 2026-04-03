import React from "react";
import { Link } from "react-router-dom"; // or 'next/link'
import Navbar from "./Landing/components/Navbar";
import { heroImg } from "../assets";

const NotFound = () => {
    return (
        <div
            className="relative h-screen flex flex-col items-center bg-[#FCFAF5] dark:bg-neutral-950 transition-colors duration-300 bg-cover bg-no-repeat"

        >
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
                {/* Large Stylized 404 */}
                <h1 className="font-hugePromo text-[120px] md:text-[180px] leading-none text-gray-900 dark:text-white">
                    4<span className="text-brand-orange">0</span>4
                </h1>

                {/* Professional Message */}
                <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800 dark:text-neutral-200">
                    Lost in the crowd?
                </h2>

                <p className="max-w-[400px] mt-4 text-[15px] text-[#4E4E4E] dark:text-neutral-400">
                    We couldn't find the page you're looking for. It might have been moved,
                    or the link is just having a bad day.
                </p>

                {/* Call to Action */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-transform active:scale-95 shadow-lg shadow-orange-500/20"
                    >
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 font-bold rounded-lg hover:bg-gray-50 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>

            {/* Subtle bottom gradient to make the hand-drawn art feel integrated */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#FCFAF5] dark:from-neutral-950 to-transparent pointer-events-none" />
        </div>
    );
};

export default NotFound;