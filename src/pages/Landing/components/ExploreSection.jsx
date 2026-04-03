import { Play } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import bouwnce from '../../../assets/bouwnce.png';

const ExploreSection = ({ onSignUp }) => {
    const handleSignUp = () => {
        if (onSignUp) {
            onSignUp();
        } else {
            alert('Sign Up clicked — ready to explore Bouwnce?');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-2">
            <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] bg-white rounded-3xl py-10 md:py-12 px-5 sm:px-8 md:px-6 text-center md:text-left transition-all duration-200 hover:scale-[1.01] shadow-[26px_0px_100px_0px_rgba(0,0,0,0.10),-32px_0px_100px_0px_rgba(0,0,0,0.10),0px_-5px_12px_0px_rgba(0,0,0,0.10),0px_-33px_100px_0px_rgba(0,0,0,0.09),0px_49px_100px_0px_rgba(0,0,0,0.05),0px_22px_100px_0px_rgba(0,0,0,0.09)]">

                {/* Image Container */}
                <div className="flex-1 shrink-0 relative flex justify-center md:block">
                    <img
                        src={bouwnce}
                        alt="Bouwnce Logo"
                        className="
      w-[200px] md:w-[260px] lg:w-[350px] 
      h-auto

      relative md:absolute
      md:-bottom-10 lg:-bottom-28 
    "
                    />
                </div>

                {/* Content */}
                <section className="flex flex-col items-center md:items-end gap-4 md:gap-6 md:max-w-60 lg:max-w-[400px] text-center md:text-right mt-6 md:mt-0">
                    <h1 className="text-xl md:text-2xl lg:text-[40px] font-extrabold">
                        Ready to Explore?
                    </h1>

                    <p className="text-sm text-black leading-relaxed max-w-[540px] md:my-5">
                        Sign Up on Bouwnce today and never struggle to find a perfect spot or match.
                    </p>

                    <Link
                        to="/register"
                        className="flex md:flex w-max h-[34px] justify-between items-center gap-2 text-[13px] px-[15px] py-[6px] bg-orange text-black font-bold rounded-lg border-2 border-black transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                    >
                        Sign Up
                        <Play size={10} fill="#FFC501" />
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default ExploreSection;