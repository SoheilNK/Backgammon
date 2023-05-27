import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const handleBurgerClick = () => {
  };
  return (
    <header className=" sticky top-0 z-20 flex flex-row  bg-green-900 text-white font-serif">
      <div className="container items-center text-justify m-auto">
        <div className="flex sm:w-3/4 relative rounded-md h-16 m-auto p-1 sm:px-6">
          <nav className={`  p-2 ${!open && "w-full"} mr--auto my-auto`}>
            <ul
              className={`flex flex-col sm:flex-row gap-3 px-4 ${
                open && "bg-green-900"
              }  m-auto`}
            >
              <li className={`sm:hidden  ${open && "block"}`}>
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
              <li className={`p-2 mr-auto sm:block  ${!open && "hidden"}`}>
                <Link to="/users">Game Room</Link>
              </li>
              <li className={`p-2 sm:block  ${!open && "hidden"}`}>
                <Link to="/users">Sign up</Link>
              </li>
              <li
                className={`sm:block  ${
                  !open && "hidden"
                }  border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
              >
                <Link to="/users">Sign in</Link>
              </li>
            </ul>
          </nav>
          <div className="absolute flex justify-center items-center inset-0 -z-40">
            <p className="text-center">
              SoSep
              <br />
              Backgammon
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
