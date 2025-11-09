// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import waitlistImg from "../assets/waitlist-img.jpg";
import { Controller, useForm } from "react-hook-form";
import { fadeIn, fadeUp } from "../utils/formatters";
import Input from "../components/common/Input";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbSchool } from "react-icons/tb";
import Button from "../components/common/Button";
import { Phone, Users, TrendingUp } from "lucide-react";
import Dropdown from "../components/common/Dropdown";
import useWaitlist from "../hooks/useWaitlist";
import { allSchools } from "nigerian-institutions";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import Logo from "../components/common/Logo";

const Waitlist = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      institution: "",
    },
  });

  const { joinWaitlist, waitlistUser } = useWaitlist();
  const { data: waitlistData, isLoading } = waitlistUser;

  // Institutions in Nigeria
  const UNIVERSITIES = allSchools().map((school) => ({
    label: school.name,
    value: school.name,
  }));

  // Dynamic metrics based on live waitlist data
  const joinedCount = waitlistData?.total || waitlistData?.data?.length || 0;
  const [animatedCount, setAnimatedCount] = useState(0);

  // Smooth count animation
  useEffect(() => {
    if (joinedCount > 0) {
      let start = 0;
      const duration = 1000;
      const increment = joinedCount / (duration / 16);

      const animate = () => {
        start += increment;
        if (start < joinedCount) {
          setAnimatedCount(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setAnimatedCount(joinedCount);
        }
      };

      animate();
    }
  }, [joinedCount]);

  const { dailyGrowth, progressPercent } = useMemo(() => {
    const EXPECTED_USERS = Math.max(joinedCount * 2, 500);
    const growthRate = Math.min(
      0.2,
      0.05 + (1 - joinedCount / EXPECTED_USERS) * 0.15
    );
    const dailyGrowth = Math.ceil(joinedCount * growthRate);
    const progressPercent = Math.min(
      (joinedCount / EXPECTED_USERS) * 100,
      100
    ).toFixed(1);
    return { EXPECTED_USERS, growthRate, dailyGrowth, progressPercent };
  }, [joinedCount]);

  const onSubmit = async (data) => {
    await joinWaitlist.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* --- Left Illustration Section --- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("left", 0.1)}
        className="hidden lg:block relative w-[40%] h-full overflow-hidden"
      >
        <motion.img
          src={waitlistImg}
          alt="workspace"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-8 left-8 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Logo size="text-xl block font-extrabold tracking-tight" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* --- Dynamic Waitlist Insight Panel --- */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.4 }}
          className="pt-10 absolute bottom-10 left-0 right-0 h-max max-w-sm mx-auto text-center text-white px-6 bg-black/40"
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
                <div className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange/20 to-amber-600/20 border border-orange/30 flex items-center justify-center backdrop-blur-sm">
                      <Users className="h-4 w-4 text-orange-300" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange to-amber-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-light bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                        {animatedCount}
                      </span>
                      <span className="text-orange-300 text-sm">+</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light tracking-wide uppercase">
                      Registered
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600/60 to-transparent"></div>

                {/* Daily Growth */}
                <div className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500/20 to-emerald-600/20 border border-lime-400/30 flex items-center justify-center backdrop-blur-sm">
                      <TrendingUp className="h-4 w-4 text-lime-300" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                  </div>
                  <div className="text-left">
                    <span className="text-lg font-light text-lime-300">
                      +{dailyGrowth}
                    </span>
                    <p className="text-xs text-gray-400 font-light tracking-wide uppercase">
                      Today
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400 font-light">
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
              </div>
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
      </motion.div>

      {/* --- Right Content Section --- */}
      <div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-12 bg-white overflow-y-auto"
      >
        <motion.div
          className="max-w-md flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Logo />
          <motion.h1
            variants={fadeIn("up", 0.3)}
            className="text-orange text-2xl md:text-3xl font-medium mb-2 tracking-tight text-center"
          >
            Something big is about to shake campus life.
          </motion.h1>

          <motion.p
            variants={fadeIn("up", 0.4)}
            className="text-sm mb-6 text-center font-medium"
          >
            It's social. It's a marketplace.{" "}
            <span className="text-orange">It's Bouwnce.</span> Join the waitlist
            — don’t hear it from others.
          </motion.p>

          {/* --- Waitlist Form --- */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-2 flex flex-col w-full max-w-[331px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div variants={fadeUp}>
              <Input
                type="text"
                placeholder="Full name"
                icon={<LuUserRound size={15} />}
                error={errors.full_name?.message}
                {...register("full_name", {
                  required: "Full name is required",
                })}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <Input
                type="email"
                placeholder="Email Address"
                icon={<MdOutlineMailOutline size={15} />}
                error={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <Input
                type="text"
                placeholder="Phone number"
                icon={<Phone size={15} />}
                error={errors.phone_number?.message}
                {...register("phone_number", {
                  required: "Phone number is required",
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  },
                })}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <Controller
                name="institution"
                control={control}
                rules={{ required: "Select your institution" }}
                render={({ field }) => (
                  <Dropdown
                    icon={<TbSchool size={15} />}
                    options={UNIVERSITIES}
                    placeholder="Select Institution"
                    error={errors.institution?.message}
                    borderFocusClass=""
                    borderClass="border border-orange"
                    bgClass="bg-white"
                    radiusClass="rounded-full"
                    dropdownClass="rounded-lg border-orange"
                    searchable={true}
                    searchPlaceholder="Search institution..."
                    allowCustomOptions={true}
                    customOptionText="Add institution"
                    enableInternetSearch={true}
                    internetSearchText="Search online for"
                    {...field}
                  />
                )}
              />
            </motion.div>

            <Button
              text="Join the waitlist"
              type="submit"
              isLoading={joinWaitlist.isPending}
              disabled={joinWaitlist.isPending}
            />
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default Waitlist;
