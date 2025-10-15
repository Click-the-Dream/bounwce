import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {
  setName,
  setEmail,
  setUsername,
  setInstitution,
  setVendor,
} from "../../store/authSlice";
import { CiAt } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbSchool } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { Store } from "lucide-react";
import { UNIVERSITIES } from "../../utils/dummies";
const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      institution: "",
      vendor: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(setName(data.name));
    dispatch(setEmail(data.email));
    dispatch(setUsername(data.username));
    dispatch(setInstitution(data.institution));
    dispatch(setVendor(data.vendor));
    navigate("/verifyAccount");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.form
        className="space-y-5 mt-2 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
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
            error={errors.name?.message}
            {...register("name", { required: "Full name is required" })}
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

        {/* Username */}
        <motion.div variants={fadeUp}>
          <Input
            type="text"
            placeholder="Username"
            icon={<CiAt size={15} />}
            error={errors.username?.message}
            {...register("username", { required: "Username is required" })}
          />
        </motion.div>

        {/* Institution (Controller used here) */}
        <motion.div variants={fadeUp}>
          <Controller
            name="institution"
            control={control}
            rules={{ required: "Select your institution" }}
            render={({ field }) => (
              <Input
                {...field}
                variant="select"
                placeholder="Institution"
                icon={<TbSchool size={15} />}
                options={UNIVERSITIES}
                error={errors.institution?.message}
              />
            )}
          />
        </motion.div>

        {/* Vendor (Controller used here) */}
        <motion.div variants={fadeUp}>
          <Controller
            name="vendor"
            control={control}
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
              <Input
                {...field}
                variant="select"
                icon={<Store size={15} />}
                placeholder="Are you a vendor?"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                error={errors.vendor?.message}
              />
            )}
          />
        </motion.div>

        <Button text="Create Account" type="submit" />
      </motion.form>

      <motion.p
        className="text-[10px] my-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        By signing up, you agree to our{" "}
        <a href="#" className="text-orange hover:underline">
          terms of service
        </a>{" "}
        and{" "}
        <a href="#" className="text-orange hover:underline">
          privacy policy
        </a>
        .
      </motion.p>
    </motion.div>
  );
};

export default CreateAccount;
