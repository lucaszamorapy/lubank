import { useEffect, useState } from "react";
import { HeaderProps } from "./Header";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Mobile = ({ isOpen, navigation, toggleMenu }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { logout } = useAuth();

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
          className={`h-screen bg-purpleLubank mt-[-37px]  fixed z-10  w-full ${
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
            <span className="flex cursor-pointer justify-between gap-10 py-1 items-center text-lg rounded-md">
              <li
                onClick={logout}
                className="text-white list-none flex items-center gap-2 flex-grow"
              >
                Logout
              </li>
            </span>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Mobile;
