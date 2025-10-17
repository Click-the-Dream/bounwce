// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";
import createPicImg from "../../assets/createpic.jpg";
import ToggleTabs from "../../components/common/ToggleTabs";

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

const AuthLayout = () => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isCreateAccount = location.pathname === "/register";

  return (
    <motion.div
      className="flex h-screen overflow-hidden"
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      {/* --- Left Image Section --- */}
      <motion.div
        variants={fadeIn("left", 0.1)}
        className="hidden lg:block relative w-[55%] h-full"
      >
        <motion.img
          src={createPicImg}
          alt="workspace"
          className="w-full h-full object-cover [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/30 [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]" />

        <motion.div
          className="absolute top-8 left-8 text-white font-extrabold text-xl tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          bounwce
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-10 text-white"
          variants={fadeIn("up", 0.6)}
        >
          <h2 className="text-2xl font-bold">Grow. Connect. Build.</h2>
          <p className="text-sm text-white/70">
            Join a community built for creators and doers.
          </p>
        </motion.div>
      </motion.div>

      {/* --- Right Onboarding Section --- */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        className="flex-1 flex flex-col items-center px-6 md:px-12 lg:px-16 bg-white overflow-y-auto"
      >
        <div className="my-auto w-full max-w-[400px]">
          <motion.h1
            key={`title-${location.pathname}`}
            variants={fadeIn("up", 0.3)}
            className="text-orange text-2xl md:text-3xl font-semibold mb-2 tracking-tight text-center"
          >
            {isCreateAccount ? "Create Account" : "Welcome Back"}
          </motion.h1>

          {isLogin && (
            <motion.p
              key={`subtitle-${location.pathname}`}
              variants={fadeIn("up", 0.4)}
              className="text-gray-500 text-sm mb-6 text-center"
            >
              Enter your email to access your account
            </motion.p>
          )}

          <div className="max-w-[368px] h-[42px]">
            <ToggleTabs
              tabs={[
                { label: "Login", path: "/login" },
                { label: "Create Account", path: "/register" },
              ]}
              activePath={location.pathname}
            />
          </div>

          <motion.div
            key={`content-${location.pathname}`}
            variants={fadeIn("up", 0.6)}
            className="w-full mt-6"
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthLayout;
