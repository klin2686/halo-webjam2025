import { useAuth } from "./contexts/AuthContext";
import TopBar from "./components/TopBar";
import backgroundImage from "./assets/background.jpg";
import SideBar from "./components/SideBar";
import RestaurantInput from "./components/RestaurantInput";
import FoodItemsSection from "./components/FoodItems";
import AllergyBar from "./components/AllergyBar";
import UserLogin from "./components/UserLogin";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-white/25 z-0"></div>
        <div className="relative z-10">
          <div className="text-black/50 font-sf-pro font-bold text-3xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <UserLogin />;
  }

  return (
    <div
      className="h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/25 z-0"></div>

      <div className="relative z-10 h-full w-full flex flex-col p-[2rem] gap-[1rem]">
        <TopBar />
        <div className="flex-1 grid grid-cols-[4fr_10fr_5fr] gap-[1rem] min-h-0">
          <SideBar />
          <div className="grid grid-rows-[1fr_3fr] gap-[1rem] min-h-0">
            <RestaurantInput />
            <FoodItemsSection />
          </div>
          <AllergyBar />
        </div>
      </div>
    </div>
  );
};

export default App;
