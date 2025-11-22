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
  const [viewingAbout, setViewingAbout] = useState<boolean>(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    if (showAboutPage) {
      return <HaloAboutPage onSignIn={() => setShowAboutPage(false)} />;
    }
    return <UserLogin />;
  }

  if (viewingAbout) {
    return <HaloAboutPage onSignIn={() => setViewingAbout(false)} />;
  }

  return (
    <div
      className="h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative overflow-y-auto lg:overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/25 z-0"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageLoadVariants}
        className="relative z-10 h-full w-full flex flex-col p-[1rem] md:p-[1.5rem] lg:p-[2rem] gap-[1rem]"
      >
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          onAboutClick={() => setViewingAbout(true)}
        />

        <div className="flex-1 flex gap-[1rem] min-h-0 relative">
          {/* Desktop Sidebar */}
          <div 
            className="hidden lg:block w-[minmax(280px,320px)] flex-shrink-0"
            style={{ width: "clamp(280px, 20vw, 320px)" }}
          >
            <SideBar
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
            />
          </div>

          {/* Mobile Sidebar Drawer */}
          <AnimatePresence>
            {isSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-[320px] bg-white/90 backdrop-blur-xl shadow-2xl p-[1rem] lg:hidden"
                >
                  <div className="h-full flex flex-col">
                     <div className="flex justify-end mb-4">
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-gray-600">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                     </div>
                     <SideBar
                      currentScreen={currentScreen}
                      onScreenChange={(screen) => {
                        setCurrentScreen(screen);
                        setIsSidebarOpen(false);
                      }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            {currentScreen === "Dashboard" ? (
              <motion.div
                key="dashboard"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabSwitchVariants}
                className="flex-1 w-full min-w-0"
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
                className="flex-1 w-full min-w-0"
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
                className="flex-1 w-full min-w-0"
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
