import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className=" sticky top-0 z-20 flex flex-row  bg-green-900 text-white font-serif">
      <div className="container items-center text-justify m-auto">
        <div className="flex md:w-3/4 max-w-3xl relative rounded-md h-16 m-auto p-1 sm:px-6">
          <nav className={`${!open && "w-full"} ${open && "p-2"} my-auto`}>
            <ul
              className={`flex flex-col md:flex-row gap-3 px-4 py-2 ${
                open && "bg-green-900"
              }  m-auto `}
            >
              <li className={`md:hidden  ${open && "block"}`}>
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

              <li
                className={`p-2 md:block hover:bg-green-700  ${
                  !open && "hidden"
                }`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`p-2 mr-auto md:block hover:bg-green-700 ${
                  !open && "hidden"
                }`}
              >
                <Link to="/users">Game Room</Link>
              </li>
              <li
                className={`p-2 md:block hover:bg-green-700 ${
                  !open && "hidden"
                }`}
              >
                <Link to="/users">Sign up</Link>
              </li>
            </ul>
          </nav>
          <div className="flex-shrink-0 m-auto mr-4 border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 rounded-lg px-2 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <li className="">
              <Link to="/signin">Sign in</Link>
            </li>
          </div>

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
