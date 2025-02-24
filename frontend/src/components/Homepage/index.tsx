import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-white bg-black h-screen w-full py-32 flex items-start justify-center">
        <div className="flex flex-col items-center justify-center py-6 w-[1100px] ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: "anticipate",
            }}
            className="w-fit h-[28px] rounded-full flex items-center justify-center px-5
        border border-[#211212]/90
      bg-[#121212]/80 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 backdrop-saturate-500 backdrop-contrast-500 bg-blend-overlay
      "
          >
            <motion.h3 className="text-sm text-[#a9a9a9] text-center flex items-center justify-center  gap-2">
              ✨ Welcome to the world of Short Urls
            </motion.h3>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-[80px] leading-[96px] mt-12 bg-clip-text text-transparent bg-gradient-to-br from-[#eeeeee] to-[#e1e1e1] pointer-events-none text-center font-bold"
          >
            AI-Powered URL Shortener Secure, Smart, and Instant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="text-lg mt-12 text-center px-28 font-medium pointer-events-none text-[#a9a9a9]"
          >
            Not just another URL shortener—our AI-powered system ensures every
            link you create is safe, reliable, and secure.
          </motion.p>
          <div className="flex items-center relative justify-center mt-4 h-20 gap-16">
            <div className="flex items-center relative justify-center h-12 w-full">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="bg-[#f2f2f2] blur-md absolute px-4 py-2 h-full min-w-[200px] rounded-full text-black font-semibold"
              />

              <motion.button
                onClick={() => navigate("/generate-qr")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="bg-[#171717] z-10 px-4 py-2 rounded-full h-full min-w-[210px] flex items-center justify-center gap-2 transition-all group  text-white font-semibold"
                aria-label="Get Started for Free"
              >
                Get Started for free <ArrowRight />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
