import RestaurantInput from "./RestaurantInput";
import FoodItemsSection from "./FoodItems";
import AllergyBar from "./AllergyBar";
import { useState } from "react";
import { type MenuItem } from "../utils/api";
import { type Allergy } from "./AllergyList";

interface DashboardProps {
  onNavigateToHistory?: () => void;
}

const Dashboard = ({ onNavigateToHistory }: DashboardProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [userAllergies, setUserAllergies] = useState<Allergy[]>([]);

  const transformMenuItems = (items: MenuItem[]) => {
    return items.map((item) => ({
      food: item.item_name,
      confidence: item.confidence_score,
      allergens: item.common_allergens,
    }));
  };

  return (
    <>
      <div className="grid grid-rows-[1fr_3fr] gap-[1rem] min-h-0">
        <RestaurantInput
          onMenuProcessed={setMenuItems}
          onSeeAllClick={onNavigateToHistory}
        />
        <FoodItemsSection
          items={transformMenuItems(menuItems)}
          allergies={userAllergies}
        />
      </div>
      <AllergyBar onAllergiesLoaded={setUserAllergies} />
    </>
  );
};

export default Dashboard;
