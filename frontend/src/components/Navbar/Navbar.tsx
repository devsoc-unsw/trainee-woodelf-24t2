import { createPortal } from "react-dom";
import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { useState } from "react";
import Credits from "../Credits/Credits";

function Navbar() {
  const [showCredits, setShowCredits] = useState(false);

  const toggleCredits = () => {
    setShowCredits((prev) => !prev);
    setTimeout(() => {
      (document.getElementById("overlay-root") as HTMLElement).style.display =
        showCredits ? "none" : "flex";
    }, 1000);
  };

  return (
    <nav className={classes.navbar}>
      <div>
        <button className={`${classes.hover} ${classes.logo}`}>
          <Logo size="lg" />
        </button>
        <button className={classes.hover}>Gamemodes</button>
        <button className={classes.hover}>Help</button>
      </div>
      <div>
        <button className={classes.hover} onClick={toggleCredits}>
          Login
        </button>
        <button className={classes.hover} onClick={toggleCredits}>
          Credits
        </button>
        <ProfileIcon url="/yellowshirt.svg" />
      </div>
      {showCredits &&
        createPortal(
          <Credits />,
          document.getElementById("overlay-root") as HTMLElement, // Target the new element
        )}
    </nav>
  );
}

export default Navbar;
