import { useEffect, useState } from "react";
import { HeaderProps } from "./Header";
import { Link } from "react-router-dom";

const Mobile = ({ isOpen, navigation, toggleMenu }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };
  return (
    <>
      {isVisible && (
        <nav
          className={`h-screen bg-purpleContabilize mt-[-37px]  fixed z-10  w-full ${
            isOpen ? "slideInRight" : "slideOutRight"
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <ul className="flex flex-col px-5 gap-5 py-5">
            {navigation.map((item, index) => (
              <li
                className="text-white text-lg"
                key={index}
                onClick={toggleMenu}
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Mobile;
