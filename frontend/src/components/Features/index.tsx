import { CircleCheckBig } from "lucide-react";
import { motion } from "motion/react";
import { features } from "../../utils/features-data";
const Features = () => {
  return (
    <div className="bg-black text-white w-full min-h-screen">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-8xl leading-[120px] text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e8e8e8] to-[#ffffff]">
          Features
        </h2>

        <div className="grid grid-cols-3 gap-14 pt-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 items-center border-neutral-500/50 rounded-2xl p-8 border"
            >
              <CircleCheckBig size={50} className="text-[#2bf73c]" />
              <h3 className="text-xl font-bold text-neutral-200">
                {feature.title}
              </h3>
              <p className="text-center text-neutral-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
