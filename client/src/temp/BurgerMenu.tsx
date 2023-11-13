import React, { useState } from "react";
import "./BurgerMenu.css";
// interface BurgerMenuProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
// }
const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="BurgerMenu">
      <button className="BurgerMenu__button" onClick={() => setOpen(!open)}>
        <div
          className={`BurgerMenu__line ${open && "BurgerMenu__line--open"}`}
        ></div>
        <div
          className={`BurgerMenu__line ${open && "BurgerMenu__line--open"}`}
        ></div>
        <div
          className={`BurgerMenu__line ${open && "BurgerMenu__line--open"}`}
        ></div>
      </button>
    </div>
  );
};

export default BurgerMenu;
