// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Login email:", data.email);
    // Simulate API call if needed
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Navigate after successful validation
    navigate("/verifyLogin");
  };

  return (
    <motion.div
      className="flex flex-col gap-5 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Your email"
          type="email"
          icon={<Mail size={15} />}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <Button
          text={isSubmitting ? "Logging in..." : "Log in"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </motion.div>
  );
};

export default LoginPage;
