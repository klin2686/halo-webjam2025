import { motion } from "framer-motion";
import SeverityTag from "./SeverityTag";
import ConfidenceTag from "./ConfidenceTag";
import { foodItemHoverVariants } from "../utils/animations";

interface FoodItemCardProps {
  food: string;
  confidence: number;
  allergens: [string, string][];
  index?: number;
}

const FoodItemCard = ({ food, confidence, allergens, index = 0 }: FoodItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover="hover"
      whileTap="tap"
      variants={foodItemHoverVariants}
      className="w-9/10 min-h-[10rem] rounded-xl bg-white backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 p-[1.5rem] my-[1rem] cursor-pointer"
    >
      <div className="flex items-center justify-between gap-2 text-black font-sf-pro font-semibold text-md">
        <div className="truncate flex-1 min-w-0">{food}</div>
        <ConfidenceTag confidence={confidence} text={confidence.toString()} />
      </div>
      <div className="grid grid-cols-3 gap-[0.5rem] pt-[1rem] place-items-center">
        {allergens.map(([allergen, severity], idx) => (
          <SeverityTag key={idx} severity={severity} text={allergen} fullWidth index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
