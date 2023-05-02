import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const handleBurgerClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header className=" sticky top-0 z-20 flex flex-row  bg-green-900 text-white font-serif">
      <div className="container items-center text-justify m-auto">
        <div className="flex sm:w-3/4 relative rounded-md h-16 m-auto p-1 sm:px-6">
          <nav className="  p-2 mr-auto my-auto">
            <ul className="flex flex-col sm:flex-row gap-3 px-4  bg-green-900 m-auto">
              <li
                className={`sm:hidden  ${open && "block"}`}
                onClick={handleBurgerClick}
              >
                <div className="BurgerMenu">
                  <button
                    className="BurgerMenu__button "
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className={`BurgerMenu__line ${
                        open && "BurgerMenu__line--open"
                      }`}
                    ></div>
                    <div
                      className={`BurgerMenu__line ${
                        open && "BurgerMenu__line--open"
                      }`}
                    ></div>
                    <div
                      className={`BurgerMenu__line ${
                        open && "BurgerMenu__line--open"
                      }`}
                    ></div>
                  </button>
                </div>
              </li>

              <li className={`p-2 sm:block  ${!open && "hidden"}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`p-2 sm:block  ${!open && "hidden"}`}>
                <Link to="/users">Game Room</Link>
              </li>
            </ul>
          </nav>
          <div className="mr-4 sm:mr-1 my-auto  ">{title}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
