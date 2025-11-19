import HaloAbout from "./About";
import HaloAboutGrid from "./HaloAboutGrid";

interface HaloAboutPageProps {
  onSignIn: () => void;
}

const HaloAboutPage = ({ onSignIn }: HaloAboutPageProps) => {
  return (
    <>
      <HaloAbout onSignIn={onSignIn} />
      <HaloAboutGrid />
    </>
  );
};

export default HaloAboutPage;
