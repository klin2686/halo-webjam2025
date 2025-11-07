import { motion } from "framer-motion";

interface ConfidenceTagProps {
  confidence: number;
  text: string;
}

const ConfidenceTag = ({ confidence, text }: ConfidenceTagProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence > 7.5) {
      return "bg-[rgba(183,255,83,0.44)]"; // Green
    } else if (confidence > 2.5) {
      return "bg-[rgba(255,170,80,0.44)]"; // Orange
    } else {
      return "bg-[rgba(255,80,80,0.44)]"; // Red
    }
  };

  const getDotColor = (confidence: number) => {
    if (confidence > 7.5) {
      return "bg-green-50";
    } else if (confidence > 2.5) {
      return "bg-orange-50";
    } else {
      return "bg-red-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`h-[1.225rem] w-[5rem] rounded-full ${getConfidenceColor(
        confidence
      )} flex items-center justify-center`}
      title="This tag indicates how confident we are that the identified allergens are correct from a scale of 0 to 10."
    >
      <div
        className={`h-[0.975rem] w-[4.700rem] rounded-full ${getDotColor(
          confidence
        )} flex items-center justify-center`}
      >
        <span className="text-sm text-black font-light font-sf-pro">
          {text}
        </span>
      </div>
    </motion.div>
  );
};

export default ConfidenceTag;
