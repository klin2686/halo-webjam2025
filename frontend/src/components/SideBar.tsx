import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import SideBarProfile from "./SideBarProfile";
import SideBarElement from "./SideBarElement";
import SideBarSwitch from "./SideBarSwitch";
import sidebarAccount from "../assets/sidebarAccount.svg";
import sidebarColor from "../assets/sidebarColor.svg";
import sidebarDashboard from "../assets/sidebarDashboard.svg";
import sidebarHistory from "../assets/sidebarHistory.svg";
import sidebarSignOut from "../assets/sidebarSignOut.svg";
import defaultUser from "../assets/defaultUser.svg";
import { sidebarVariants } from "../utils/animations";

interface SideBarProps {
  currentScreen?: string;
  onScreenChange?: (screen: string) => void;
}

const SideBar = ({ currentScreen, onScreenChange }: SideBarProps) => {
  const { user, logout } = useAuth();
  const [activeElement, setActiveElement] = useState<string>(currentScreen || "Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSignOut = () => {
    logout();
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    console.log(isDarkMode ? "light mode" : "dark mode");
  };

  if (currentScreen && currentScreen !== activeElement) {
    setActiveElement(currentScreen);
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="h-full w-full min-h-[300px] relative bg-white/50 rounded-3xl shadow-xl backdrop-blur-sm outline outline-1 outline-offset-[-0.0625rem] outline-white/50 overflow-y"
    >
      <div className="flex flex-col h-full p-[1rem]">
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          <SideBarProfile
            picture={user?.profile_picture || defaultUser}
            name={user?.name || user?.email || "User"}
          />
          <div className="flex justify-center w-full">
            <hr className="w-9/10 justify-center pt-[1rem] opacity-40"></hr>
          </div>

          <SideBarElement
            element="Dashboard"
            logo={sidebarDashboard}
            onClick={() => {
              setActiveElement("Dashboard");
              onScreenChange?.("Dashboard");
            }}
            active={activeElement === "Dashboard"}
          />
          <SideBarElement
            element="History"
            logo={sidebarHistory}
            onClick={() => {
              setActiveElement("History");
              onScreenChange?.("History");
            }}
            active={activeElement === "History"}
          />

          <br></br>
          <div className="flex justify-center w-full">
            <hr className="w-9/10 justify-center pt-[1rem] opacity-40"></hr>
          </div>

          <SideBarElement
            element="Account"
            logo={sidebarAccount}
            onClick={() => {
              setActiveElement("Account");
              onScreenChange?.("Account");
            }}
            active={activeElement === "Account"}
          />
          <SideBarElement
            element="Sign Out"
            logo={sidebarSignOut}
            onClick={handleSignOut}
            active={activeElement === "Sign Out"}
          />
        </div>

        <div className="flex flex-col flex-shrink-0">
          <div className="flex justify-center w-full">
            <hr className="w-9/10 justify-center pt-[1rem] opacity-40"></hr>
          </div>
          <div className="flex flex-col justify-center w-full p-[1rem]">
            <SideBarSwitch
              element="Dark Mode"
              logo={sidebarColor}
              isOn={isDarkMode}
              onToggle={handleDarkModeToggle}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideBar;
