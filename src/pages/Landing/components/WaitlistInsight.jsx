import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";

const WaitlistInsight = ({ isLoading, joinedCount, animatedCount, progressPercent, waitlistData, hideAnalytics }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
            viewport={{ amount: 0.4 }}
            className={`pt-10 md:absolute md:bottom-10 md:left-0 md:right-0 md:bg-black/40 md:text-white fixed bottom-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md text-black  h-max w-full max-w-sm mx-auto text-center px-6`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-orange to-amber-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-gradient-to-r from-orange to-amber-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-light">Syncing waitlist data...</span>
                </div>
            ) : joinedCount > 0 ? (
                <div className="space-y-6">
                    {/* Core Stats */}
                    <div className="flex items-center justify-center gap-6">
                        {/* Joined Count */}
                        <div className="flex flex-wrap items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange/50 md:from-orange/20 to-amber-600/50 md:to-amber-600/20 border border-orange/30 flex items-center justify-center backdrop-blur-sm">
                                    <Users className="h-4 w-4 text-orange-300" />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange to-amber-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                            </div>
                            <div className="text-left">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-2xl font-light bg-clip-text text-transparent ${!hideAnalytics ? 'bg-gradient-to-br from-white to-gray-300' : 'bg-gradient-to-br from-gray-400 to-gray-700'}`}>
                                        {animatedCount}
                                    </span>
                                    <span className="text-orange-300 text-sm">+</span>
                                </div>
                                <p className="text-xs text-gray-600 md:text-gray-400 font-light tracking-wide uppercase">
                                    Registered
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600/60 to-transparent"></div>

                        {/* Daily Growth */}
                        <div className="flex flex-wrap items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500/50 md:from-lime-500/20 to-emerald-600/50 md:to-emerald-600/20 border border-lime-400/30 flex items-center justify-center backdrop-blur-sm">
                                    <TrendingUp className="h-4 w-4 text-gray-700 md:text-lime-300" />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                            </div>
                            <div className="text-left">
                                <span className={`text-lg font-light ${!hideAnalytics ? "text-lime-300" : "text-lime-700"}`}>
                                    +{waitlistData?.today_count || 0}
                                </span>
                                <p className="text-xs text-gray-600 md:text-gray-400 font-light tracking-wide uppercase">
                                    Today
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    {!hideAnalytics && <div className="space-y-3">
                        <div className="flex justify-between gap-1 items-center text-xs text-gray-400 font-light">
                            <span>Early Access Progress</span>
                            <span>{progressPercent}%</span>
                        </div>
                        <div className="w-56 mx-auto h-0.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-orange to-amber-500 rounded-full"
                            />
                        </div>

                        <p className="text-xs text-gray-400 text-center font-light tracking-wider">
                            Join early to secure{" "}
                            <span className="text-orange">priority access</span> and
                            unlock campus-exclusive benefits.
                        </p>
                    </div>}
                </div>
            ) : (
                <div className="flex items-center justify-center gap-3 text-sm text-gray-300">
                    <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange to-amber-500 flex items-center justify-center">
                            <span className="text-xs">✨</span>
                        </div>
                    </div>
                    <span className="font-light">
                        Be among the first to join Bouwnce.
                    </span>
                </div>
            )}
        </motion.div>
    )
}

export default WaitlistInsight
