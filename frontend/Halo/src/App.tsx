import { useAuth } from "./contexts/AuthContext";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import backgroundImage from "./assets/background.jpg";
import UserLogin from "./components/UserLogin";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import { useState } from "react";
import Account from "./components/Account";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<String>("Dashboard");

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <UserLogin />;
  }

  return (
    <div
      className="h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/25 z-0"></div>

      <div className="relative z-10 h-full w-full flex flex-col p-[2rem] gap-[1rem]">
        <TopBar />
        <div className={`flex-1 grid gap-[1rem] min-h-0 ${currentScreen === "Dashboard" ? "grid-cols-[minmax(250px,320px)_1fr_minmax(300px,400px)]" : "grid-cols-[minmax(250px,320px)_1fr]"}`}>
          <SideBar onScreenChange={setCurrentScreen} />
          {currentScreen === "Dashboard" ? (
            <Dashboard />
          ) : currentScreen === "History" ? (
            <History />
          ) : (
            <Account />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
