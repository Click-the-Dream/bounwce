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
import { Phone } from "lucide-react";
import Dropdown from "../components/common/Dropdown";
import useWaitlist from "../hooks/useWaitlist";
import { allSchools } from "nigerian-institutions";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import navLogo from "../assets/nav-logo.png";
import WaitlistInsight from "./Landing/components/WaitlistInsight";

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
  const UNIVERSITIES = useMemo(() => {
    return [
      ...allSchools().map((school) => ({
        label: school.name,
        value: school.name,
      })),
      { label: "Koladaisi University", value: "Koladaisi University" }, // Added manually
    ].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

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
    joinWaitlist.mutate(data, {
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
          <img
            src={navLogo}
            alt="bouwnce"
            className="h-6 mb-4 hidden md:block invert brightness-0"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        {/* --- Dynamic Waitlist Insight Panel --- */}
        <WaitlistInsight isLoading={isLoading} joinedCount={joinedCount} animatedCount={animatedCount} progressPercent={progressPercent} waitlistData={waitlistData} />
      </motion.div>

      {/* --- Right Content Section --- */}
      <div className="flex-1 w-full overflow-y-auto lg:overflow-hidden flex flex-col items-center justify-stretch md:justify-center bg-white">
        <motion.img
          src={waitlistImg}
          alt="workspace"
          className="block lg:hidden w-full h-48 object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center w-full p-4 md:p-6 lg:p-12 lg:overflow-y-auto"
        >
          <motion.div
            className="max-w-md flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img src={navLogo} alt="bouwnce" className="h-8 mb-4 block md:hidden" />
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
              <span className="text-orange">It's bouwnce.</span> Join the
              waitlist — don’t hear it from others.
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
            <div className="text-xs text-gray-400 mt-3 text-center block md:hidden">
              <WaitlistInsight isLoading={isLoading} joinedCount={joinedCount} animatedCount={animatedCount} progressPercent={progressPercent} waitlistData={waitlistData} hideAnalytics={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
