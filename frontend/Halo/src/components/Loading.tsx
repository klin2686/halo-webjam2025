import backgroundImage from "../assets/background.jpg";

const Loading = () => {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-white/25 z-0"></div>
      <div className="relative z-10">
        <div className="text-black/50 font-sf-pro font-bold text-3xl">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
