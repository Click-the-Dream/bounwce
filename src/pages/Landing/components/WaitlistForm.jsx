import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { Phone } from "lucide-react";
import { TbSchool } from "react-icons/tb";
import { useMemo } from "react";
import { allSchools } from "nigerian-institutions";
import useWaitlist from "../../../hooks/useWaitlist";

const WaitlistForm = () => {
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

  const onSubmit = async (data) => {
    await joinWaitlist.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const UNIVERSITIES = useMemo(() => {
    return [
      ...allSchools().map((school) => ({
        label: school.name,
        value: school.name,
      })),
      { label: "Koladaisi University", value: "Koladaisi University" },
    ].sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const { joinWaitlist, waitlistUser } = useWaitlist();
  const { data: waitlistData, isLoading } = waitlistUser;

  return (
    <div className="w-full">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-2 flex flex-col w-full p-6 md:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 transition-colors duration-300"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { 
            opacity: 0, 
            scale: 0.95,
            boxShadow: "0px 0px 0px rgba(255, 79, 51, 0)" 
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            boxShadow: "0px 0px 30px rgba(255, 79, 51, 0.4), inset 0px 0px 10px rgba(255, 79, 51, 0.1)",
            transition: { 
              duration: 0.6, 
              ease: "easeOut",
              staggerChildren: 0.12 
            },
          },
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
                borderClass="border border-brand-orange"
                bgClass="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md transition-colors duration-300"
                radiusClass="rounded-full"
                dropdownClass="rounded-lg border-brand-orange dark:bg-neutral-900 dark:text-white"
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

        <motion.div variants={fadeUp}>
          <Button
            text="Join the waitlist"
            type="submit"
            isLoading={joinWaitlist.isPending}
            disabled={joinWaitlist.isPending}
          />
        </motion.div>
      </motion.form>
    </div>
  );
};

export default WaitlistForm;