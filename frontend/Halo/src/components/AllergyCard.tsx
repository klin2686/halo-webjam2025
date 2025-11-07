import React from "react";
import SeverityTag from "./SeverityTag";

interface AllergyCardProps {
  id: number;
  allergen: string;
  severity: string;
  editActive: boolean;
}

const AllergyCard = ({ allergen, severity, editActive }: AllergyCardProps) => {
  return (
    <div className="flex flex-row items-center justify-start px-[1.25rem] w-full transition-all ease-in-out duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`cursor-pointer stroke-[rgba(255,80,80,0.44)] flex-shrink-0 transition-all ease-in-out duration-300 ${
          editActive ? 'opacity-100 w-[2rem] h-[2rem] mr-4' : 'opacity-0 w-0 h-0 mr-0 pointer-events-none'
        }`}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 12H9m12 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
      </svg>
      <div className="flex-1 rounded-xl shadow-xl backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 p-[1.5rem] my-[1rem] transition-all ease-in-out duration-300">
        <div className="flex items-center justify-between text-black font-sf-pro font-semibold text-xl">
          <div>{allergen}</div>
          <SeverityTag
            severity={severity}
            text={severity.charAt(0).toUpperCase() + severity.slice(1)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllergyCard;
