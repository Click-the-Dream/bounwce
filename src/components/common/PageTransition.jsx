import { motion } from "framer-motion"

const PageTransition = ({children}) => {
  return (
    <motion.div
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{ opacity: 1}}
        transition={{duration: 0.4, ease: "easeInOut"}}
        className="w-full h-full"
    >
        {children}
    </motion.div>
  )
}

export default PageTransition