import { useState } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import navigation from "../../config/navigation.json";

type NavigationProps = {
  path: string;
  name: string;
  icon: string;
};

export type HeaderProps = {
  isOpen: boolean;
  navigation: NavigationProps[];
  toggleMenu: () => void;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Desktop
        isOpen={isOpen}
        navigation={navigation}
        toggleMenu={toggleMenu}
      />
      <Mobile isOpen={isOpen} toggleMenu={toggleMenu} navigation={navigation} />
    </div>
  );
};

export default Header;
