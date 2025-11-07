import { motion } from "framer-motion";

interface SeverityTagProps {
  severity: string;
  text: string;
  fullWidth?: boolean;
  index?: number;
}

const SeverityTag = ({ severity, text, fullWidth = false, index = 0 }: SeverityTagProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-[rgba(255,80,80,0.44)]";
      case "moderate":
        return "bg-[rgba(255,170,80,0.44)]";
      case "mild":
        return "bg-[rgba(183,255,83,0.44)]";
      case "none":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  const getDotColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-red-500";
      case "moderate":
        return "bg-orange-400";
      case "mild":
        return "bg-green-400";
      case "none":
        return "bg-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`h-[1.125rem] ${
        fullWidth ? "w-full max-w-[5.5rem]" : "w-[5.5rem]"
      } rounded-full ${getSeverityColor(
        severity
      )} flex items-center p-2 gap-[0.25rem] cursor-default`}
      title={text}
    >
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(severity)}`} />
      <div className="flex-1 flex items-center justify-center min-w-0">
        <span className="text-sm text-black font-light font-sf-pro truncate pointer-events-none">
          {text}
        </span>
      </div>
    </motion.div>
  );
};

export default SeverityTag;
