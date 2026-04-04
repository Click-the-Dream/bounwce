import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Globe, MoreHorizontal } from 'lucide-react';
import DemoSearch from './DemoSearch';
import DemoLoading from './DemoLoading';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import bouwnceBrowse from '../assets/bouwnce-browse.png';

const BouwnceDemo = () => {
    const [step, setStep] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const cursorControls = useAnimation();
    /*const isInView = useInView(containerRef, {
        amount: 0.5,
        once: false
    });*/

    useEffect(() => {
        let isMounted = true;

        const runLoop = async () => {
            if (!isMounted) return;
            while (isMounted) {
                // RESET
                await cursorControls.start({ opacity: 0, transition: { duration: 0.5 } });

                await new Promise(r => setTimeout(r, 500)); // wait for AnimatePresence exit to finish
                setStep(0);
                setHoveredItem(null);
                cursorControls.set({ x: 210, y: 200, opacity: 0, scale: 1 });
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
                await cursorControls.start({ x: 20, y: 20, transition: { duration: 1.2, ease: "easeInOut" } });
                setHoveredItem('socials');
                await new Promise(r => setTimeout(r, 600));

                // Click
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setStep(2);
                setHoveredItem(null);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });

                // 3. Move to Bouwnce App row
                await new Promise(r => setTimeout(r, 800));
                await cursorControls.start({ x: 20, y: 90, transition: { duration: 1.2, ease: "easeInOut" } });
                setHoveredItem('bouwnce');
                await new Promise(r => setTimeout(r, 600));

                // Final Click
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setStep(3);
                setHoveredItem(null);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });


                await new Promise(r => setTimeout(r, 800));

                // Move to the Search button (approx right side of the search bar)
                await cursorControls.start({
                    x: 130,
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
                //if (!isInView) break;
            }
        };
        //const id = requestAnimationFrame(() => runLoop());

        runLoop();
        return () => { isMounted = false;} // cancelAnimationFrame(id); };
    }, [cursorControls]);

    return (
        <div style={{
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

            <header className="w-full h-7 flex items-center justify-between border-b border-gray-200">
                {step < 3 ? (
                    // Default header with gray dots
                    <div className="flex gap-1.5 mx-5">
                        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                    </div>
                ) : (
                    // Mac-style browser header
                    <div className="flex items-center justify-between w-full">
                        <img src={bouwnceBrowse} alt="Mac Header" className="h-full rounded-t-3xl" />


                    </div>
                )}
            </header>
            <div className="flex w-full h-full">

                {/* Sidebar */}
                <div className={`border-r-[0.53px] border-[#D6D6D6] bg-[#FAFAFA] transition-all duration-500 flex-shrink-0 ${step === 0 ? 'w-52' : 'w-14'}`}>
                    {/* Adjust padding of the container based on step */}
                    <div className="space-y-3 transition-all py-3 px-1 md:px-2">
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
                                <motion.div key="cat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                                    <h1 className="text-[9px] text-[#8A8A8A] mb-1 font-medium p-2">Application / <span className="text-black">Category</span></h1>
                                    <p className="text-[#8A8A8A] text-[9px] mb-5 font-medium px-2">Click on preferred category</p>

                                    <div className="space-y-1">
                                        <div className="grid grid-cols-3 text-[6px] md:text-[9px] font-medium uppercase tracking-[0.1em] text-black border-b-[0.53px] border-[#DBDBDB] bg-[#FAFAFA] mb-2">
                                            <span className="px-3 py-1">Name</span><span className="px-3 py-1">Users</span><span className="text-right px-3 py-1">Action</span>
                                        </div>
                                        <CategoryRow name="Communication" color="bg-purple-100 text-purple-600" char="c" />
                                        <CategoryRow name="Socials" color="bg-orange-100 text-orange-600" char="s" active={hoveredItem === 'socials'} />
                                        <CategoryRow name="Life Style" color="bg-yellow-100 text-yellow-600" char="l" />
                                        <CategoryRow name="Games" color="bg-green-100 text-green-600" char="g" />
                                        <CategoryRow name="Finance" color="bg-blue-600 text-white" char="b" />
                                    </div>
                                </motion.div>
                            )}
                            {step === 2 && (
                                <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                                    <div className="flex items-center gap-2 text-[9px] mb-5 font-medium text-[#8A8A8A] p-2">
                                        <span>Category</span> <span>/</span> <span className="text-black">Socials</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="grid grid-cols-3 text-[6px] font-medium md:text-[9px] uppercase tracking-[0.1em] text-black border-b-[0.53px] border-[#DBDBDB] bg-[#FAFAFA] mb-2">
                                            <span className="px-3 py-1">Application</span><span className="px-3 py-1">URL</span><span className="text-right px-3 py-1">Status</span>
                                        </div>
                                        <AppRow name="Google" url="www.google.com" icon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.987" fill-rule="evenodd" clip-rule="evenodd" d="M4.41041 0.0434101C4.947 -0.01447 5.26452 -0.01447 5.84108 0.0434101C6.86166 0.18925 7.80775 0.64471 8.54254 1.34393C8.04601 1.79706 7.55599 2.25681 7.07265 2.72305C6.147 1.9656 5.11378 1.79077 3.973 2.19855C3.13616 2.57013 2.55343 3.17227 2.22481 4.00499C1.68781 3.619 1.1578 3.22402 0.635022 2.82023C0.598691 2.80177 0.557196 2.79501 0.516602 2.80094C1.34702 1.25508 2.64471 0.335669 4.40967 0.0426955" fill="#F44336" />
                                            <path opacity="0.997" fill-rule="evenodd" clip-rule="evenodd" d="M0.515315 2.80306C0.557256 2.79687 0.596976 2.8033 0.634476 2.82235C1.15725 3.22614 1.68726 3.62112 2.22427 4.00711C2.13976 4.33157 2.0865 4.66287 2.06514 4.99679C2.0834 5.31978 2.13644 5.63681 2.22427 5.94788L0.555282 7.23054C-0.171523 5.76424 -0.184845 4.28841 0.515315 2.80306Z" fill="#FFC107" />
                                            <path opacity="0.999" fill-rule="evenodd" clip-rule="evenodd" d="M8.46314 8.78263C7.94347 8.34016 7.39942 7.9251 6.83338 7.53928C7.40081 7.15246 7.74521 6.62177 7.8666 5.94722H5.08594V4.0829C6.68955 4.07004 8.29242 4.08314 9.89454 4.12221C10.1985 5.7157 9.84742 7.15246 8.84134 8.43249C8.72171 8.55527 8.59499 8.67213 8.46314 8.78263Z" fill="#448AFF" />
                                            <path opacity="0.993" fill-rule="evenodd" clip-rule="evenodd" d="M2.22367 5.94531C2.83058 7.40161 3.94324 8.0814 5.56165 7.9847C6.01596 7.93392 6.45154 7.78069 6.83319 7.53737C7.39963 7.9242 7.94288 8.33865 8.46295 8.78073C7.63892 9.49562 6.58829 9.9198 5.48245 9.98406C5.23121 10.0035 4.97877 10.0035 4.72752 9.98406C2.84365 9.76969 1.45271 8.85075 0.554688 7.22725L2.22367 5.94531Z" fill="#43A047" />
                                        </svg>
                                        } />
                                        <AppRow name="Snapchat" url="www.snapchat.com" icon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="10" height="10" rx="2" fill="#FFEF5E" />
                                            <path d="M4.4209 2.25391C4.76732 2.12393 5.14625 2.11583 5.49512 2.22949L5.64258 2.28613L5.64941 2.28906C5.89562 2.38248 6.1072 2.5502 6.25391 2.76855C6.4004 2.98681 6.47553 3.24519 6.46875 3.50781V4.32031C6.46876 4.35528 6.46972 4.39413 6.47754 4.42969C6.48527 4.46481 6.50427 4.51992 6.55762 4.55859C6.61178 4.59775 6.67113 4.59799 6.70703 4.59375C6.74274 4.5895 6.77881 4.57811 6.80957 4.56738L6.80859 4.56641L7.1377 4.45703C7.16105 4.4534 7.18473 4.45274 7.20801 4.45703L7.22852 4.46094L7.24902 4.45898C7.25854 4.45819 7.26792 4.46046 7.27637 4.46484C7.28489 4.46933 7.29214 4.47608 7.29688 4.48438L7.30859 4.50195C7.3135 4.50837 7.31641 4.51639 7.31641 4.52441C7.31635 4.53196 7.31301 4.53876 7.30859 4.54492C7.26124 4.598 7.20865 4.64623 7.15137 4.68848C7.09711 4.72581 7.04106 4.76186 6.98242 4.79883L6.79785 4.91699C6.72829 4.9634 6.65087 5.02796 6.60938 5.12695C6.56671 5.22881 6.57261 5.34096 6.6123 5.46094V5.46191C6.73992 5.85302 6.98587 6.19487 7.31543 6.44141V6.44238C7.47277 6.56508 7.58286 6.62817 7.73926 6.7334C7.69608 6.75059 7.65373 6.76905 7.61035 6.78516L7.3623 6.86621C7.27005 6.88375 7.18581 6.93065 7.12305 7.00098C7.05596 7.07636 7.01721 7.17353 7.01465 7.27441V7.2793H7.01367V7.28027H7.0127L7.00195 7.2793L6.99219 7.28027L6.48633 7.31543L6.47266 7.31738C6.26232 7.35246 6.06021 7.42241 5.87402 7.52344L5.69727 7.63184C5.47248 7.77851 5.20797 7.85438 4.93945 7.84961C4.67121 7.84478 4.41065 7.7598 4.19141 7.60547L4.18457 7.60156L4.05957 7.52832C3.76318 7.36917 3.43079 7.28668 3.09277 7.29004H3.06738C3.0238 7.29004 2.9976 7.28779 2.98145 7.28516C2.97591 7.26758 2.97018 7.24036 2.96289 7.19434H2.96094C2.95429 7.1314 2.93309 7.0709 2.89453 7.02051C2.85458 6.9683 2.79991 6.92977 2.73828 6.90723H2.73926C2.69046 6.8875 2.64247 6.87196 2.60059 6.8584C2.55705 6.8443 2.51914 6.83155 2.48242 6.81641H2.48145C2.40516 6.78557 2.32076 6.75308 2.23926 6.71973C2.5627 6.55417 2.85207 6.32904 3.08984 6.05371L3.0918 6.05176C3.25956 5.85071 3.38165 5.61623 3.4541 5.36523C3.48292 5.28876 3.48667 5.20525 3.46191 5.12695C3.43561 5.04409 3.38025 4.97368 3.30664 4.92773H3.30762C3.16797 4.83441 3.03146 4.74677 2.90332 4.65332L2.90039 4.65137L2.8125 4.58203C2.78815 4.56089 2.76555 4.5379 2.74316 4.51465C2.73864 4.50649 2.73438 4.49764 2.73438 4.48828C2.73447 4.47706 2.73861 4.46624 2.74512 4.45703L2.75195 4.44727L2.75684 4.4375C2.75999 4.43124 2.76507 4.4259 2.77148 4.42285C2.77787 4.41985 2.78508 4.41939 2.79199 4.4209H2.79395L3.08789 4.49805L3.09961 4.50098L3.15234 4.5127L3.20996 4.53711L3.21777 4.54004C3.25869 4.55468 3.31002 4.56884 3.3623 4.56445C3.42814 4.55882 3.4865 4.52399 3.52051 4.46289C3.5465 4.4161 3.55135 4.36531 3.55273 4.33496C3.55424 4.30134 3.55296 4.26276 3.55176 4.22852L3.55078 4.22363L3.53906 3.98242C3.53091 3.74479 3.5348 3.50687 3.55078 3.26953C3.58164 3.03623 3.67856 2.81619 3.83105 2.63672C3.94564 2.50196 4.0879 2.39364 4.24707 2.31934L4.41113 2.25684L4.4209 2.25391Z" fill="white" stroke="black" stroke-width="0.3" />
                                        </svg>

                                        } />
                                        <AppRow name="Youtube" url="www.youtube.com" icon={<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.77931 1.25275C9.72195 1.01062 9.61007 0.789868 9.45479 0.61249C9.29951 0.435111 9.10627 0.307292 8.8943 0.24176C8.11827 0 4.99501 0 4.99501 0C4.99501 0 1.8716 0.00731794 1.09557 0.249078C0.883597 0.314614 0.690349 0.44244 0.535073 0.619827C0.379797 0.797213 0.267911 1.01797 0.210558 1.26012C-0.0241726 2.83517 -0.115229 5.2352 0.217003 6.74725C0.274363 6.98938 0.386251 7.21013 0.541526 7.38751C0.696802 7.56489 0.890047 7.69271 1.10202 7.75824C1.87805 8 5.00138 8 5.00138 8C5.00138 8 8.12468 8 8.90067 7.75824C9.11264 7.69271 9.3059 7.5649 9.46118 7.38752C9.61646 7.21014 9.72836 6.98939 9.78572 6.74725C10.0333 5.16996 10.1096 2.77141 9.77931 1.25275Z" fill="#FF0000" />
                                            <path d="M4.00098 5.71761L6.59196 4.00334L4.00098 2.28906V5.71761Z" fill="white" />
                                        </svg>
                                        } />
                                        <AppRow name="Slack" url="www.slack.com" icon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_8275_621)">
                                                <path d="M2.12891 6.30602C2.12891 6.87867 1.66188 7.34641 1.08914 7.34641C0.516406 7.34641 0.0488281 6.87867 0.0488281 6.30602C0.0488281 5.73336 0.516562 5.26562 1.08922 5.26562H2.12898L2.12891 6.30602ZM2.65305 6.30602C2.65305 5.73336 3.12078 5.26562 3.69344 5.26562C4.26609 5.26562 4.73383 5.73328 4.73383 6.30602V8.91031C4.73383 9.48297 4.26617 9.9507 3.69344 9.9507C3.12078 9.9507 2.65305 9.48297 2.65305 8.91031V6.30602Z" fill="#DE1C59" />
                                                <path d="M3.69344 2.13086C3.12078 2.13086 2.65305 1.66383 2.65305 1.09109C2.65305 0.518359 3.12078 0.0507812 3.69344 0.0507812C4.26609 0.0507812 4.73383 0.518516 4.73383 1.09117V2.13094L3.69344 2.13086ZM3.69344 2.655C4.26609 2.655 4.73383 3.12273 4.73383 3.69539C4.73383 4.26805 4.26617 4.73578 3.69344 4.73578H1.08914C0.516484 4.73578 0.0488281 4.26812 0.0488281 3.69539C0.0488281 3.12273 0.516562 2.655 1.08922 2.655H3.69344Z" fill="#35C5F0" />
                                                <path d="M7.87055 3.69539C7.87055 3.12273 8.33758 2.655 8.91031 2.655C9.48305 2.655 9.9507 3.12273 9.9507 3.69539C9.9507 4.26805 9.48297 4.73578 8.91031 4.73578H7.87055V3.69539ZM7.34641 3.69539C7.34641 4.26805 6.87867 4.73578 6.30602 4.73578C5.73336 4.73578 5.26562 4.26812 5.26562 3.69539V1.09109C5.26563 0.518438 5.73328 0.0507812 6.30602 0.0507812C6.87867 0.0507812 7.34641 0.518516 7.34641 1.09117V3.69539Z" fill="#2EB57D" />
                                                <path d="M6.30602 7.87055C6.87867 7.87055 7.34641 8.33758 7.34641 8.91031C7.34641 9.48305 6.87867 9.9507 6.30602 9.9507C5.73336 9.9507 5.26562 9.48297 5.26562 8.91031V7.87055H6.30602ZM6.30602 7.34641C5.73336 7.34641 5.26562 6.87867 5.26562 6.30602C5.26562 5.73336 5.73328 5.26562 6.30602 5.26562H8.91031C9.48297 5.26562 9.9507 5.73328 9.9507 6.30602C9.9507 6.87867 9.48297 7.34641 8.91031 7.34641H6.30602Z" fill="#EBB02E" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_8275_621">
                                                    <rect width="10" height="10" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        } />
                                        <AppRow name="Bouwnce" url="www.bouwnce.com" icon={<svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.41375 2.31675C3.56608 2.31675 7.05454 2.19986 8.11569 2.8513C9.08313 3.44523 9.63004 4.33564 9.87971 5.36482C10.1294 6.394 9.98788 7.47031 9.47858 8.41598C8.96928 9.36165 8.12264 10.1201 7.07851 10.5661C6.03437 11.0121 4.85518 11.1189 3.73572 10.8689C2.61625 10.6189 1.62346 10.0271 0.921326 9.1912C0.219192 8.35528 -0.00389161 7.36314 0.0203041 6.30915C0.0203806 5.18728 0.0203204 5.62281 0.0616356 4.17107H2.30497C2.30497 4.67249 2.26323 5.74634 2.30497 6.32894C2.35224 6.98888 2.41375 7.56818 2.74333 7.95893C3.21081 8.51317 3.65118 8.723 4.27129 8.86147C4.89141 8.99994 5.5446 8.94077 6.12299 8.69372C6.70138 8.44668 7.17036 8.02654 7.45249 7.50269C7.73461 6.97885 7.81299 6.38264 7.67468 5.81254C7.53638 5.24244 7.25118 4.77162 6.69541 4.43507C6.16024 4.09852 3.05207 4.17107 2.41375 4.17107V2.31675Z" fill="black" />
                                            <rect width="2.38772" height="2.17767" fill="#FF4A2A" />
                                        </svg>

                                        } active={hoveredItem === 'bouwnce'} />
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
    <div className={`grid grid-cols-3 items-center p-1 px-3 transition-all duration-200 border ${active ? 'bg-[#FFE9E5] border-[#FF4B2B] shadow-sm' : 'border-transparent'}`}>
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
    <div className={`grid grid-cols-3 items-center p-1 px-3 transition-all duration-200 border ${active ? 'bg-[#FFE9E5] border-[#FF4B2B] shadow-sm' : 'border-transparent'}`}>
        <div className="flex items-center gap-3">
            <div className="rounded-full flex items-center justify-center text-white text-[6px] md:text-[9px] font-black">{icon}</div>
            <span className="text-[#8A8A8A] text-[6px] md:text-[9px]">{name}</span>
        </div>
        <span className="text-[#8A8A8A] text-[6px] md:text-[9px] font-medium truncate pr-4">{url}</span>
        <div className="flex justify-end"><MoreHorizontal size={18} className="text-[#8A8A8A]" /></div>
    </div>
);

export default BouwnceDemo;
