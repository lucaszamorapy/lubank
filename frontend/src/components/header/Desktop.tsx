import { Link } from "react-router-dom";
import { HeaderProps } from "./Header";
import LogoPurple from "/images/VetorizadoBrancoSemFundo.svg";
import "./header.css";
import { useAuth } from "../../contexts/AuthContext";

import { mdiAccountCog, mdiHome, mdiLogout, mdiPoll } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "../../contexts/ThemeContext";

interface iconProps {
  [key: string]: string;
}

const Desktop = ({ isOpen, navigation, toggleMenu }: HeaderProps) => {
  const { logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const iconMap: iconProps = {
    mdiPoll: mdiPoll,
    mdiAccountCog: mdiAccountCog,
    mdiHome: mdiHome,
  };

  return (
    <section className="bg-purpleLubank z-10 top-0 fixed w-full xl:h-full xl:w-auto shadow-md py-5 px-5">
      <div className="container">
        <nav className="flex justify-between gap-10 xl:flex-col items-center">
          <Link to={"/home"}>
            <img src={LogoPurple} className="xl:mb-0  w-20 lg:w-40" />
          </Link>
          <ul className="xl:flex xl:flex-col gap-5 hidden">
            {navigation.map((item, index) => {
              const iconPath = iconMap[item.icon];
              return (
                <Link
                  to={item.path}
                  key={index}
                  className="flex justify-between gap-10 px-3 py-1 items-center hover:bg-purple-950 duration-300 text-xl rounded-md"
                >
                  <li className="text-white list-none flex items-center gap-2 flex-grow">
                    {item.name}
                  </li>
                  {iconPath && (
                    <Icon
                      path={iconPath}
                      className="text-xl"
                      color="#fff"
                      size={1}
                    />
                  )}
                </Link>
              );
            })}
            <span className="flex cursor-pointer justify-between gap-10 px-3 py-1 items-center hover:bg-purple-950 duration-300 text-xl rounded-md">
              <li
                onClick={logout}
                className="text-white list-none flex items-center gap-2 flex-grow"
              >
                Logout
              </li>
              <Icon path={mdiLogout} size={1} color="#fff" />
            </span>
            {/* <span className="flex cursor-pointer justify-between gap-10 px-3 py-1 items-center hover:bg-purple-950 duration-300 text-xl rounded-md">
              <li
                onClick={toggleTheme}
                className="text-white list-none flex items-center gap-2 flex-grow"
              >
                Trocar tema
              </li>
              <Icon path={mdiLogout} size={1} color="#fff" />
            </span> */}
          </ul>
          <span
            className={`mobile-menu-5 block xl:hidden ${isOpen && "toggle"}`}
            onClick={toggleMenu}
          >
            <span className="line-1 bg-white"></span>
            <span className="line-2 bg-white"></span>
            <span className="line-3 bg-white"></span>
          </span>
        </nav>
      </div>
    </section>
  );
};

export default Desktop;
