interface SeverityTagProps {
  severity: string;
  text: string;
}

const SeverityTag = ({ severity, text }: SeverityTagProps) => {
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
    <div
      className={`h-[1.125rem] w-[5.25rem] rounded-full ${getSeverityColor(
        severity
      )} ${
        severity === "none" ? "" : ""
      } flex items-center p-2 gap-[0.25rem]`}
    >
      <div className={`w-2 h-2 rounded-full ${getDotColor(severity)}`} />
      <div className="flex-1 flex items-center justify-center">
        <span className="text-sm text-black font-light font-sf-pro">
          {text}
        </span>
      </div>
    </div>
  );
};

export default SeverityTag;
