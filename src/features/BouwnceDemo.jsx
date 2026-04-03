import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Globe, MoreHorizontal, Youtube, Slack, Chrome, Ghost } from 'lucide-react';
import Logo from '../pages/Landing/components/Logo';
import DemoSearch from './DemoSearch';
import DemoLoading from './DemoLoading';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BouwnceDemo = () => {
    const [step, setStep] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const cursorControls = useAnimation();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        amount: 0.5,
        once: false
    });

    useEffect(() => {
        let isMounted = true;

        const runLoop = async () => {
            if (!isMounted || !isInView) return;
            while (isMounted && isInView) {
                // RESET
                await cursorControls.start({ opacity: 0, transition: { duration: 0.5 } });

                await new Promise(r => setTimeout(r, 500)); // wait for AnimatePresence exit to finish
                setStep(0);
                setHoveredItem(null);
                cursorControls.set({ x: 200, y: 200, opacity: 0, scale: 1 });
                await cursorControls.start({ opacity: 1, transition: { duration: 0.5 } });

                // 1. Move to Applications Sidebar
                await cursorControls.start({ x: -130, y: -130, transition: { duration: 1.5, ease: "easeInOut" } });
                setHoveredItem('apps');
                await new Promise(r => setTimeout(r, 500));

                // Click
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setStep(1);
                setHoveredItem(null);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // 2. Move to Socials Category
                await new Promise(r => setTimeout(r, 800));
                // Center-aligned coordinates for the Category row
                await cursorControls.start({ x: 20, y: 30, transition: { duration: 1.2, ease: "easeInOut" } });
                setHoveredItem('socials');
                await new Promise(r => setTimeout(r, 600));

                // Click
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setStep(2);
                setHoveredItem(null);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // 3. Move to Bouwnce App row
                await new Promise(r => setTimeout(r, 800));
                await cursorControls.start({ x: 20, y: 100, transition: { duration: 1.2, ease: "easeInOut" } });
                setHoveredItem('bouwnce');
                await new Promise(r => setTimeout(r, 600));

                // Final Click
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setStep(3); // Switch to Search Bar screen
                setHoveredItem(null);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // 4. MOVE TO SEARCH BUTTON (Step 3 to Step 4 transition)
                // We keep the cursor visible here
                await new Promise(r => setTimeout(r, 800));

                // Move to the Search button (approx right side of the search bar)
                await cursorControls.start({
                    x: 140,
                    y: 80,
                    transition: { duration: 1.2, ease: "backOut" }
                });

                // Click the Search Button
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 200));

                setStep(4); // Show the Circular Loading

                // Now hide cursor while it loads
                await cursorControls.start({ opacity: 0, transition: { duration: 0.3 } });

                await new Promise(r => setTimeout(r, 900)); // Loading time
                if (!isInView) break;
            }
        };
        const id = requestAnimationFrame(() => runLoop());

        if (isInView) {
            runLoop();
        } else {
            cursorControls.stop();
        }
        return () => { isMounted = false; cancelAnimationFrame(id); };
    }, [cursorControls, isInView]);

    return (
        <div ref={containerRef} style={{
            boxShadow: `0px 10px 13.4px -1px #0000000D, 0px 0px 4px 0px #00000040 inset`

        }} className="relative w-full h-[380px] bg-white rounded-3xl border border-gray-200 overflow-hidden font-sans text-sm shadow-2xl mx-auto select-none flex flex-col items-center justify-center">

            {/* --- ANIMATED HAND CURSOR --- */}
            <motion.div
                animate={cursorControls}
                className="absolute z-[100] pointer-events-none"
                initial={{ x: 200, y: 200, opacity: 0 }}
                style={{ originX: 0.2, originY: 0.2 }}
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.43601 8.89734C2.23482 8.63866 1.98333 8.11413 1.54502 7.46025C1.29353 7.10098 0.675584 6.41837 0.488763 6.06628C0.354088 5.85232 0.315009 5.5918 0.380982 5.34774C0.493764 4.88371 0.933944 4.57589 1.4085 4.6292C1.77553 4.70293 2.11283 4.88282 2.37853 5.14655C2.56404 5.32128 2.73469 5.51115 2.8887 5.7142C3.00366 5.8579 3.0324 5.91539 3.16174 6.08065C3.29108 6.24592 3.3773 6.41118 3.31264 6.16688C3.26234 5.80761 3.17611 5.20403 3.05396 4.66512C2.96055 4.25555 2.93899 4.19089 2.85277 3.88191C2.76654 3.57294 2.71625 3.31426 2.62284 2.96218C2.53745 2.61625 2.47029 2.26608 2.42164 1.91311C2.33107 1.46165 2.39696 0.992806 2.60846 0.583802C2.85952 0.347667 3.2278 0.285343 3.54257 0.425722C3.85916 0.65949 4.0952 0.985935 4.218 1.35983C4.4063 1.81997 4.53197 2.30332 4.59164 2.79691C4.70661 3.51546 4.92936 4.56453 4.93654 4.78009C4.93654 4.51423 4.88624 3.95377 4.93654 3.70228C4.98638 3.4401 5.1686 3.22251 5.41797 3.12744C5.63195 3.06179 5.85832 3.04702 6.07903 3.08433C6.3018 3.1309 6.49913 3.25904 6.6323 3.4436C6.79878 3.86279 6.89116 4.30772 6.90535 4.75853C6.92459 4.36376 6.99216 3.97283 7.10654 3.5945C7.22661 3.42531 7.40196 3.30334 7.60234 3.2496C7.83988 3.20616 8.08333 3.20616 8.32088 3.2496C8.51567 3.31472 8.68607 3.43751 8.80949 3.60168C8.96165 3.98276 9.05377 4.38514 9.08253 4.79446C9.08253 4.89506 9.13283 4.51423 9.29091 4.26274C9.37306 4.01886 9.57907 3.83734 9.83135 3.78654C10.0836 3.73575 10.3438 3.8234 10.514 4.01648C10.6841 4.20956 10.7383 4.47873 10.6561 4.72261C10.6561 5.18966 10.6561 5.1681 10.6561 5.48426C10.6561 5.80042 10.6561 6.08065 10.6561 6.34651C10.63 6.76699 10.5723 7.18491 10.4837 7.59678C10.3586 7.96116 10.1846 8.30684 9.96634 8.62429C9.61745 9.01228 9.32918 9.45075 9.11128 9.92486C9.05721 10.1604 9.03307 10.4018 9.03942 10.6434C9.0387 10.8666 9.0677 11.0889 9.12565 11.3045C8.83186 11.3355 8.53562 11.3355 8.24184 11.3045C7.96161 11.2613 7.61671 10.7009 7.5233 10.5284C7.47708 10.4358 7.38248 10.3773 7.27899 10.3773C7.1755 10.3773 7.08091 10.4358 7.03469 10.5284C6.87661 10.8015 6.52452 11.2973 6.28022 11.326C5.79879 11.3835 4.8072 11.326 4.02399 11.326C4.02399 11.326 4.15333 10.6075 3.85873 10.3488C3.56413 10.0901 3.26234 9.78833 3.03959 9.58714L2.43601 8.89734Z" fill="white" stroke="black" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.52914 9.28813V6.80788C8.52914 6.65941 8.4085 6.53906 8.25969 6.53906C8.11087 6.53906 7.99023 6.65941 7.99023 6.80788V9.28813C7.99023 9.43659 8.11087 9.55694 8.25969 9.55694C8.4085 9.55694 8.52914 9.43659 8.52914 9.28813Z" fill="black" />
                    <path d="M7.10698 9.28722L7.09261 6.80569C7.09176 6.65759 6.97042 6.53821 6.82161 6.53907C6.6728 6.53992 6.55286 6.66068 6.55372 6.80878L6.56809 9.29031C6.56894 9.43842 6.69028 9.55779 6.83909 9.55694C6.9879 9.55608 7.10784 9.43533 7.10698 9.28722Z" fill="black" />
                    <path d="M5.11622 6.81138L5.13059 9.28778C5.13145 9.4373 5.25279 9.55781 5.40161 9.55694C5.55042 9.55606 5.67035 9.43414 5.66948 9.28462L5.65511 6.80823C5.65425 6.6587 5.53291 6.5382 5.38409 6.53907C5.23528 6.53994 5.11535 6.66186 5.11622 6.81138Z" fill="black" />
                </svg>

            </motion.div>

            <header className="w-full p-3 border-b border-gray-200">
                <div className="flex gap-1.5 mx-3">
                    <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                    <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                    <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                </div>
            </header>
            <div className="flex w-full h-full">

                {/* Sidebar */}
                <div className={`border-r-[0.53px] border-[#D6D6D6] bg-[#FAFAFA] transition-all duration-500 flex-shrink-0 ${step === 0 ? 'w-52' : 'w-14'}`}>
                    {/* Adjust padding of the container based on step */}
                    <div className="space-y-3 transition-all py-3 px-2">
                        <div className={`
            flex items-center rounded-[3px] transition-all duration-300 border p-2  py-3
            h-5 w-full leading-none
            ${hoveredItem === 'apps' || step >= 1 ? 'bg-white border-[#DBDBDB] shadow-sm justify-center' : 'border-transparent bg-[#F3F3F3]'}
        `}>
                            <Globe size={12} className="text-gray-600" />

                            <AnimatePresence>
                                {step === 0 && (
                                    <>
                                        <span className="font-bold text-gray-800 text-[9px] pl-2">Applications</span>
                                        <span className="ml-auto text-[9px] rounded-full border">
                                            20
                                        </span>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Placeholders */}
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="bg-[#F3F3F3] opacity-60 mx-auto p-2 h-5 w-full rounded-[3px]" />
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`step-${step}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full"
                        >
                            {step === 0 && (
                                <div className="flex flex-col h-full">
                                    <div className="h-8 w-48 bg-gray-50 rounded-lg mb-4 animate-pulse" />
                                    <div className="h-4 w-64 bg-gray-50 rounded-lg mb-12 animate-pulse" />
                                    <div className="flex-1 border-2 border-dashed border-gray-50 rounded-3xl" />
                                </div>
                            )}
                            {step === 1 && (
                                <motion.div key="cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-8 h-full">
                                    <h1 className="text-[9px] text-[#8A8A8A] mb-1 font-medium">Application / <span className="text-black">Category</span></h1>
                                    <p className="text-[#8A8A8A] text-[9px] mb-5 font-medium">Click on preferred category</p>

                                    <div className="space-y-1">
                                        <div className="grid grid-cols-3 text-[6px] md:text-[9px] uppercase tracking-[0.1em] text-black border-b-[0.53px] border-[#DBDBDB] bg-[#FAFAFA] mb-2">
                                            <span className="p-2">Name</span><span className="p-2">Users</span><span className="text-right p-2">Action</span>
                                        </div>
                                        <CategoryRow name="Communication" color="bg-purple-100 text-purple-600" char="c" />
                                        <CategoryRow name="Socials" color="bg-orange-100 text-orange-600" char="s" active={hoveredItem === 'socials'} />
                                        <CategoryRow name="Life Style" color="bg-yellow-100 text-yellow-600" char="l" />
                                        <CategoryRow name="Games" color="bg-green-100 text-green-600" char="g" />
                                        <CategoryRow name="Finance & Business" color="bg-blue-600 text-white" char="b" />
                                    </div>
                                </motion.div>
                            )}
                            {step === 2 && (
                                <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-8 h-full">
                                    <div className="flex items-center gap-2 text-[9px] mb-5 font-medium text-[#8A8A8A]">
                                        <span>Category</span> <span>/</span> <span className="text-black">Socials</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="grid grid-cols-3 text-[6px] md:text-[9px] uppercase tracking-[0.1em] text-black border-b-[0.53px] border-[#DBDBDB] bg-[#FAFAFA] mb-2">
                                            <span className="p-2">Application</span><span className="p-2">URL</span><span className="text-right p-2">Status</span>
                                        </div>
                                        <AppRow name="Google" url="www.google.com" icon={<Chrome size={12} />} color="bg-[#EA4335]" />
                                        <AppRow name="Snapchat" url="www.snapchat.com" icon={<Ghost size={12} />} color="bg-[#FFFC00] !text-black" />
                                        <AppRow name="Youtube" url="www.youtube.com" icon={<Youtube size={12} />} color="bg-[#FF0000]" />
                                        <AppRow name="Slack" url="www.slack.com" icon={<Slack size={12} />} color="bg-[#4A154B]" />
                                        <AppRow name="Bouwnce" url="www.bouwnce.com" icon={<Logo onlyImage={true} size={24} />} color="" active={hoveredItem === 'bouwnce'} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="search-final" className="h-full w-full">
                                    <DemoSearch />
                                </motion.div>
                            )}
                            {step === 4 && (
                                <DemoLoading key="loading" />
                            )}
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

// Reusable Rows with the specific design tokens
const CategoryRow = ({ name, color, char, active }) => (
    <div className={`grid grid-cols-3 items-center p-1 transition-all duration-200 border ${active ? 'bg-[#FFE9E5] border-[#FF4B2B] shadow-sm' : 'border-transparent'}`}>
        <div className="flex items-center gap-3">
            <div className={`${color} w-5 h-5 rounded-full flex items-center justify-center text-[6px] md:text-[9px] font-black uppercase shadow-sm`}>{char}</div>
            <span className="text-[#8A8A8A] text-[6px] md:text-[9px]">{name}</span>
        </div>
        <div className="flex -space-x-2">
            {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 shadow-sm" />)}
        </div>
        <div className="flex justify-end"><MoreHorizontal size={18} className="text-gray-300" /></div>
    </div>
);

const AppRow = ({ name, url, icon, color, active }) => (
    <div className={`grid grid-cols-3 items-center p-1 transition-all duration-200 border ${active ? 'bg-[#FFE9E5] border-[#FF4B2B] shadow-sm' : 'border-transparent'}`}>
        <div className="flex items-center gap-3">
            <div className={`${color} w-5 h-5 rounded-full flex items-center justify-center text-white text-[6px] md:text-[9px] font-black shadow-sm`}>{icon}</div>
            <span className="text-[#8A8A8A] text-[6px] md:text-[9px]">{name}</span>
        </div>
        <span className="text-[#8A8A8A] text-[6px] md:text-[9px] font-medium truncate pr-4">{url}</span>
        <div className="flex justify-end"><MoreHorizontal size={18} className="text-[#8A8A8A]" /></div>
    </div>
);

export default BouwnceDemo;