import { createPortal } from "react-dom";
import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { useState } from "react";
import Credits from "../Credits/Credits";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function Navbar() {
  const [showCredits, setShowCredits] = useState(false);
  const navigate = useNavigate();

  const toggleCredits = () => {
    setShowCredits((prev) => !prev);
    setTimeout(() => {
      (document.getElementById("overlay-root") as HTMLElement).style.display =
        showCredits ? "none" : "flex";
    }, 10);
  };

  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
          <Menu className={classes.hamburger} />
        <button
          className={`${classes.hover} ${classes.logo}`}
          onClick={() => navigate("/home")}
        >
          <Logo size="lg" />
        </button>
        <button
          className={`${classes.hover} ${classes.hideOnMobile}`}
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </button>
        <button
          className={`${classes.hover} ${classes.hideOnMobile}`}
          onClick={() => navigate("/gamemodes")}
        >
          Gamemodes
        </button>
        <button className={`${classes.hover} ${classes.hideOnMobile}`}>
          Help
        </button>
      </div>
      <div>
        <button
          className={`${classes.hover} ${classes.hideOnMobile}`}
          onClick={toggleCredits}
        >
          Credits
        </button>
        <div onClick={toggleDropDown} className={classes.hideOnMobile}>
          <ProfileIcon url="/yellowshirt.svg" />
          {showDropDown && <ProfileDropdown username="Chris" />}
        </div>
      </div>
      {showCredits &&
        createPortal(
          <Credits onClick={toggleCredits} />,
          document.getElementById("overlay-root") as HTMLElement,
        )}
    </nav>
  );
}

export default Navbar;
