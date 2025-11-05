// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import waitlistImg from "../assets/waitlist.svg";
import { Controller, useForm } from "react-hook-form";
import { fadeUp } from "../utils/formatters";
//import { UNIVERSITIES } from "../utils/dummies";
import Input from "../components/common/Input";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbSchool } from "react-icons/tb";
import Button from "../components/common/Button";
import { Phone } from "lucide-react";
import Dropdown from "../components/common/Dropdown";
import useWaitlist from "../hooks/useWaitlist";
import { allSchools } from "nigerian-institutions";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay },
  },
});

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
  const { data: waitlistData } = waitlistUser;
  const UNIVERSITIES = allSchools().map((school) => ({
    label: school.name,
    value: school.name,
  }));

  const onSubmit = async (data) => {
    await joinWaitlist.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* --- Left Illustration Section (Animates Only Once) --- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("left", 0.1)}
        className="hidden lg:block relative w-[40%] h-full"
      >
        <motion.img
          src={waitlistImg}
          alt="workspace"
          className="w-full h-full object-cover object-top"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/20" /> */}

        {/* Branding */}
        {/* <motion.div
          className="absolute top-8 left-8 text-white font-extrabold text-xl tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          bouwnce
        </motion.div> */}

        {/* Tagline */}
        <motion.div
          className="absolute bottom-12 left-10 text-white/70 text-sm"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
        >
          <h2>Grow. Connect. Build.</h2>
          <p>Join a community built for creators and doers.</p>
        </motion.div>
      </motion.div>

      {/* --- Right Content Section (Re-animates on Route Change) --- */}
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
          <motion.div
            className="block lg:hidden text-white font-extrabold text-4xl tracking-tight bg-gradient-to-r from-orange to-amber-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            bouwnce
          </motion.div>
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
            It's social, It's a marketplace,{" "}
            <span className="text-orange">It's Bouwnce</span>, join the
            waitlist, don't hear it from others
          </motion.p>
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
            {/* Full name */}
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

            {/* Email */}
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

            {/* phone */}
            <motion.div variants={fadeUp}>
              <Input
                type="text"
                placeholder="Phone number"
                icon={<Phone size={15} />}
                error={errors.phone_number?.message}
                {...register("phone_number", {
                  required: "Phone number is required",
                  onChange: (e) => {
                    // Only allow digits
                    e.target.value = e.target.value.replace(/\D/g, "");
                  },
                })}
              />
            </motion.div>

            {/* Institution */}
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
