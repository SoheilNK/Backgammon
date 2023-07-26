import React, { useState } from "react";
import { User } from "../types/user.type";
import { LogoutButton } from "./Signout";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../services/useLocalStorage";
interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const userString = localStorage.getItem("user");
  let isLoggedIn: boolean =
    JSON.parse(localStorage.getItem("isLoggedIn")!) || false;
  const navigate = useNavigate();

  let user: User = {
    id: 0,
    username: "",
    email: "",
    password: "",
    role: "",
    createdAt: Date.now() as unknown as Date,
    updatedAt: Date.now() as unknown as Date,
  };
  if (
    isLoggedIn &&
    userString !== "null" &&
    userString !== null &&
    userString !== undefined &&
    userString !== ""
  ) {
    user = JSON.parse(userString!);
  }

  return (
    <header className=" sticky top-0 z-20 flex flex-row  bg-green-900 text-white font-serif">
      <div className="container items-center text-justify m-auto">
        <div className="flex mx-4 md:w-3/4 max-w-3xl relative rounded-md h-16 md:m-auto p-1 sm:px-6">
          <nav
            className={`${!open && "w-full"} ${open && "p-2"} my-auto mr-auto`}
          >
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
                onClick={() => navigate("/")}
                className={`cursor-pointer rounded p-2 md:block hover:bg-green-700  ${
                  !open && "hidden"
                }`}
              >
                {/* <Link to="/">Home</Link> */}
                Home
              </li>
              <li
                onClick={() => navigate("/users")}
                className={`cursor-pointer rounded p-2 mr-auto md:block hover:bg-green-700 ${
                  !open && "hidden"
                }`}
              >
                Game Room
              </li>
            </ul>
          </nav>

          <div className="cursor-pointer flex items-center flex-shrink-0 m-2 border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 rounded-lg px-2 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <button onClick={() => setOpenProfile(!openProfile)}>
              <span className={`${!isLoggedIn && "hidden"}`}>
                {isLoggedIn ? user.username || "Profile" : ""}
              </span>
              <span
                className={`${isLoggedIn && "hidden"}`}
                onClick={() => navigate("/signin")}
              >
                Sign in/Register
              </span>
            </button>
          </div>
          <nav
            className={` absolute top-full right-2 md:right-8 p-4 cursor-pointer  bg-green-900  ${
              !openProfile && "hidden"
            }`}
          >
            <ul className="flex flex-col gap-3 ">
              <li
                onClick={() => navigate("/myprofile")}
                className={`cursor-pointer w-full rounded p-2 mr-auto md:block hover:bg-green-700 `}
              >
                My Profile
              </li>
              <li
                className={`cursor-pointer w-full rounded p-2 mr-auto md:block hover:bg-green-700 `}
                onClick={() => setOpenProfile(!openProfile)}
              >
                <LogoutButton />
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
