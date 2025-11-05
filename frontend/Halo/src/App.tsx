import TopBar from "./components/TopBar";
import backgroundImage from "./assets/background.jpg";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <div
      className="h-screen w-screen flex flex-col bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/25 z-0"></div>

      <div className="relative z-10 h-screen w-screen flex flex-col">
        <div className="h-screen w-screen pt-4 px-8">
          <TopBar />
          <div className="h-71/80 grid grid-cols-3 pt-4">
            <SideBar />
            <div className="grid grid-rows-2">
              <div>test</div>
              <div>test</div>
            </div>
            <div>test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
