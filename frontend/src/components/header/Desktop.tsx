import { Link } from "react-router-dom";
import { HeaderProps } from "./Header";
import LogoPurple from "/images/VetorizadoBrancoSemFundo.svg";
import "./header.css";
import { IconType } from "react-icons";
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoBarChart } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import { IoIosExit } from "react-icons/io";

interface iconProps {
  [key: string]: IconType;
}

const Desktop = ({ isOpen, navigation, toggleMenu }: HeaderProps) => {
  const { logout } = useAuth();
  const iconMap: iconProps = {
    IoBarChart: IoBarChart,
    MdManageAccounts: MdManageAccounts,
    FaHome: FaHome,
  };
  return (
    <section className="bg-purpleContabilize z-10 top-0 fixed w-full xl:h-full xl:w-auto shadow-md py-5 px-5">
      <div className="container">
        <nav className="flex justify-between gap-10 xl:flex-col items-center">
          <img src={LogoPurple} className="xl:mb-0  w-20 lg:w-40" />
          <ul className="xl:flex xl:flex-col gap-5 hidden">
            {navigation.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <Link
                  to={item.path}
                  key={index}
                  className="flex justify-between gap-10 px-3 py-1 items-center hover:bg-purple-950 duration-300 text-xl rounded-md"
                >
                  <li className="text-white list-none flex items-center gap-2 flex-grow">
                    {item.name}
                  </li>
                  {Icon && <Icon className="text-xl" color="#fff" />}
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
              <IoIosExit className="text-xl" color="#fff" />
            </span>
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
