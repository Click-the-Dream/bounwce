"use client";
import Link from "next/link";
import Navbar from "./Navbar";

const NotFound = () => {
  return (
    <div className="relative h-screen flex flex-col items-center bg-[#FCFAF5] transition-colors duration-300 bg-cover bg-no-repeat">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        {/* Large Stylized 404 */}
        <h1 className="font-hugePromo text-[120px] md:text-[180px] leading-none text-gray-900">
          4<span className="text-brand-orange">0</span>4
        </h1>

        {/* Professional Message */}
        <h2 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800">
          Lost in the crowd?
        </h2>

        <p className="max-w-100 mt-4 text-[15px] text-[#4E4E4E]">
          We couldn't find the page you're looking for. It might have been
          moved, or the link is just having a bad day.
        </p>

        {/* Call to Action */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-transform active:scale-95 shadow-lg shadow-orange-500/20"
          >
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white dark:bg-neutral-900 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Subtle bottom gradient to make the hand-drawn art feel integrated */}
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-[#FCFAF5] to-transparent pointer-events-none" />
    </div>
  );
};

export default NotFound;
