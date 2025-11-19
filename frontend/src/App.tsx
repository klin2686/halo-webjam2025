import { useAuth } from "./hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import backgroundImage from "./assets/background.jpg";
import UserLogin from "./components/UserLogin";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import { useState } from "react";
import Account from "./components/Account";
import { pageLoadVariants, tabSwitchVariants } from "./utils/animations";
import HaloAboutPage from "./components/HaloAboutPage";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<string>("Dashboard");
  const [showAboutPage, setShowAboutPage] = useState<boolean>(true);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    if (showAboutPage) {
      return <HaloAboutPage onSignIn={() => setShowAboutPage(false)} />;
    }
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageLoadVariants}
        className="relative z-10 h-full w-full flex flex-col p-[2rem] gap-[1rem]"
      >
        <TopBar />
        <div className="flex-1 flex gap-[1rem] min-h-0">
          <div
            className="w-[minmax(250px,320px)] flex-shrink-0"
            style={{ width: "clamp(250px, 20vw, 320px)" }}
          >
            <SideBar
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {currentScreen === "Dashboard" ? (
              <motion.div
                key="dashboard"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabSwitchVariants}
                className="flex-1 grid grid-cols-[1fr_minmax(300px,400px)] gap-[1rem] min-h-0"
              >
                <Dashboard
                  onNavigateToHistory={() => setCurrentScreen("History")}
                />
              </motion.div>
            ) : currentScreen === "History" ? (
              <motion.div
                key="history"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabSwitchVariants}
                className="flex-1"
              >
                <History />
              </motion.div>
            ) : (
              <motion.div
                key="account"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabSwitchVariants}
                className="flex-1"
              >
                <Account />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
