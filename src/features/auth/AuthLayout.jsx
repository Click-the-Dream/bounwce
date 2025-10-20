// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, Outlet } from "react-router-dom";
import createPicImg from "../../assets/createpic.jpg";
import ToggleTabs from "../../components/common/ToggleTabs";

// Animation variants for smooth fade-in effects
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
  const pathname = location.pathname;

  const isLogin = pathname === "/login";
  const isCreateAccount = pathname === "/register";
  const isVerificationPage =
    pathname.startsWith("/email_verification") ||
    pathname.startsWith("/verify");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* --- Left Illustration Section (Animates Only Once) --- */}
      <motion.div
        initial="hidden"
        animate="show"
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)]" />

        {/* Branding */}
        <motion.div
          className="absolute top-8 left-8 text-white font-extrabold text-xl tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          bounwce
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="absolute bottom-12 left-10 text-white"
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-2xl font-bold">Grow. Connect. Build.</h2>
          <p className="text-sm text-white/70">
            Join a community built for creators and doers.
          </p>
        </motion.div>
      </motion.div>

      {/* --- Right Content Section (Re-animates on Route Change) --- */}
      <div
        key={pathname}
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col items-center px-4 md:px-6 lg:px-12 bg-white overflow-y-auto"
      >
        <div className="my-auto w-full max-w-[400px]">
          {isVerificationPage ? (
            // --- Minimal Layout for Verification Pages ---
            <div className="w-full">
              <Outlet />
            </div>
          ) : (
            // --- Default Layout (Login / Register) ---
            <>
              <motion.h1
                key={`title-${pathname}`}
                variants={fadeIn("up", 0.3)}
                className="text-orange text-2xl md:text-3xl font-semibold mb-2 tracking-tight text-center"
              >
                {isCreateAccount ? "Create Account" : "Welcome Back"}
              </motion.h1>

              {isLogin && (
                <motion.p
                  key={`subtitle-${pathname}`}
                  variants={fadeIn("up", 0.4)}
                  className="text-gray-500 text-sm mb-6 text-center"
                >
                  Enter your email to access your account
                </motion.p>
              )}

              {/* Tabs */}
              <div className="max-w-[368px] h-[42px]">
                <ToggleTabs
                  tabs={[
                    { label: "Login", path: "/login" },
                    { label: "Create Account", path: "/register" },
                  ]}
                  activePath={pathname}
                />
              </div>

              {/* Page Content */}
              <motion.div
                key={`content-${pathname}`}
                variants={fadeIn("up", 0.6)}
                className="w-full mt-6"
              >
                <Outlet />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
