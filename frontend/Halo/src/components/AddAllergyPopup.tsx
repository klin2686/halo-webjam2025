import { useState } from "react";
import { STANDARD_ALLERGENS } from "./AllergyList";
import type { Allergy } from "./AllergyList";

interface AddAllergyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  existingAllergies: Allergy[];
}

const AddAllergyPopup = ({
  isOpen,
  onClose,
  existingAllergies,
}: AddAllergyPopupProps) => {
  const [selectedAllergen, setSelectedAllergen] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("mild");

  if (!isOpen) return null;

  //FIlter Allergies from original list
  const existingAllergenNames = existingAllergies.map((a) =>
    a.allergen.toLowerCase()
  );
  const availableAllergens = STANDARD_ALLERGENS.filter(
    (allergen) => !existingAllergenNames.includes(allergen.toLowerCase())
  );

  const handleSubmit = () => {
    // This is just for now, functionality has not ben added
    console.log("Submit:", {
      allergen: selectedAllergen,
      severity: selectedSeverity,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md bg-white/90 rounded-3xl shadow-2xl backdrop-blur-md outline outline-2 outline-offset-[-1px] outline-white/50 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-all"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path // This is the X icon from tailwind css
              d="M15 5L5 15M5 5L15 15"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-sf-pro font-bold text-black mb-6">
          Add New Allergy
        </h2>

        <div className="mb-4">
          <label className="block text-black font-sf-pro font-semibold mb-2">
            Select Allergen
          </label>
          <select
            value={selectedAllergen}
            onChange={(e) => setSelectedAllergen(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-xl font-sf-pro text-black outline-none focus:outline-sky-500/50 focus:outline-2"
          >
            <option value="" disabled>
              Choose an allergen...
            </option>
            {availableAllergens.map((allergen) => (
              <option key={allergen} value={allergen}>
                {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-black font-sf-pro font-semibold mb-2">
            Select Severity
          </label>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-xl font-sf-pro text-black outline-none focus:outline-sky-500/50 focus:outline-2"
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAllergen}
          className="w-full py-3 bg-sky-500/70 hover:bg-sky-500/90 disabled:bg-gray-400/50 disabled:cursor-not-allowed rounded-xl font-sf-pro font-bold text-white text-lg transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Add Allergy
        </button>
      </div>
    </div>
  );
};

export default AddAllergyPopup;
