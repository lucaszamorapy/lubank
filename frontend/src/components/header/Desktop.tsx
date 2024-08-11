import { Link } from "react-router-dom";
import { HeaderProps } from "./Header";
import LogoPurple from "/images/logo.svg";
import "./header.css";

const Desktop = ({ isOpen, navigation, toggleMenu }: HeaderProps) => {
  return (
    <section className="bg-purpleContabilize z-10 top-0 fixed w-full xl:h-full xl:w-auto shadow-md py-5 px-5">
      <div className="container">
        <nav className="flex justify-between gap-10 xl:flex-col items-center">
          <img src={LogoPurple} className="xl:mb-20" />
          <ul className="xl:flex items-center xl:flex-col gap-5 hidden">
            {navigation.map((item, index) => (
              <li key={index} className="text-white linha list-none">
                <Link to={item.path} className="text-xl " key={index}>
                  {item.name}
                </Link>
              </li>
            ))}
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
