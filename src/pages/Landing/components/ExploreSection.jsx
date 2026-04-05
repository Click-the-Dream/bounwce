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
        <div className="flex justify-center items-center h-full md:min-h-screen pt-24 md:pt-32 bg-white">
            <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] min-h-[353px] bg-white rounded md:rounded-3xl py-10 md:py-12 px-5 md:px-8 lg:px-[60px] text-center md:text-left transition-all duration-200 hover:scale-[1.01] shadow-[26px_0px_100px_0px_rgba(0,0,0,0.10),-32px_0px_100px_0px_rgba(0,0,0,0.10),0px_-5px_12px_0px_rgba(0,0,0,0.10),0px_-33px_100px_0px_rgba(0,0,0,0.09),0px_49px_100px_0px_rgba(0,0,0,0.05),0px_22px_100px_0px_rgba(0,0,0,0.09)]">

                {/* Image Container */}
                <div className="self-stretch flex-1 flex justify-center md:shrink-0 relative md:block h-max min-h-full">
                    <img
                        src={bouwnce}
                        alt="Bouwnce Logo"
                        className="
      w-[200px] md:w-[260px] lg:w-[400px] 
      h-auto

      absolute
      -top-24 md:-top-40 bottom-0 left-auto right-auto md:left-0 md:right-0
    "
                    />
                </div>

                {/* Content */}
                <section className="flex-1 h-full flex flex-col items-center md:items-end  md:max-w-60 lg:max-w-[400px] text-center md:text-right mt-32 md:mt-0">
                    <h1 className="text-xl md:text-2xl lg:text-[40px] font-extrabold">
                        Ready to Explore?
                    </h1>

                    <p className="text-sm text-black leading-relaxed max-w-[540px] my-5">
                        Join the waitlist today and be the first to experience the future of local discovery with Bouwnce.
                    </p>

                    <Link
                        to="/waitlist"
                        className="flex md:flex w-max h-[34px] justify-between items-center gap-2 text-[13px] px-[25px] py-[6px] bg-orange text-black font-medium rounded-lg border-[0.53px] border-black transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
                        style={{
                            boxShadow: `
    0px -14px 6px 0px #0000004D inset,
    0px 3px 4px 0px #0000004D inset,
    3px 0px 4px 0px #00000080 inset,
    -3px 0px 4px 0px #00000080 inset
  `
                        }}
                    >
                        Join Us
                        <Play size={10} fill="#FFFFFF" />
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default ExploreSection;