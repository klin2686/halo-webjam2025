import { type MenuItem } from "../utils/api";
import type { Allergy } from "./AllergyList";

interface HistoryCardProps {
  id: number;
  name: string;
  dateTime: string;
  menuItems: MenuItem[];
  allergies: Allergy[];
  onCardClick: () => void;
}

const HistoryCard = ({ id, name, dateTime, menuItems, allergies, onCardClick }: HistoryCardProps) => {
  return (
    <div
      className="flex flex-row items-center justify-start w-full transition-all ease-in-out duration-300 opacity-100 scale-100"
    >
      <div
        className="flex-1 rounded-xl shadow-xl backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 p-[1.5rem] my-[1rem] transition-all ease-in-out duration-300 hover:scale-101 active:scale-99 cursor-pointer"
        onClick={onCardClick}
      >
        <div className="flex items-center justify-between">
          <div className="text-black font-sf-pro font-semibold text-xl">{name}</div>
          <div className="text-black font-sf-pro font-normal text-lg">{dateTime}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
