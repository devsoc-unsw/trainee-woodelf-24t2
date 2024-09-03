import { createPortal } from "react-dom";
import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { useState } from "react";
import Credits from "../Credits/Credits";
import { useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import Sheet from "../Sheet/Sheet";

function Navbar() {
  const [showCredits, setShowCredits] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const navigate = useNavigate();

  const toggleCredits = () => {
    setShowCredits((prev) => !prev);
    setTimeout(() => {
      (document.getElementById("overlay-root") as HTMLElement).style.display =
        showCredits ? "none" : "flex";
    }, 10);
  };

  const handleNavigation = (path: string) => {
    setShowDropDown(false);
    navigate(path);
  };

  return (
    <div>
      <nav className={classes.navbar}>
        <div>
          <button
            className={`${classes.hover} ${classes.logo}`}
            onClick={() => handleNavigation("/home")}
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
          <div
            onClick={() => setShowProfileDropDown(!showProfileDropDown)}
            className={classes.hideOnMobile}
          >
            <ProfileIcon url="/yellowshirt.svg" />
            {showProfileDropDown && <ProfileDropdown username="Chris" />}
          </div>
        </div>
        {showCredits &&
          createPortal(
            <Credits onClick={toggleCredits} />,
            document.getElementById("overlay-root") as HTMLElement,
          )}
        <button
          className={classes.hamburger}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {showDropDown ? <X color="white" /> : <Menu color="white" />}
        </button>
      </nav>
      {showDropDown && (
        <Sheet dropdownNavbar className={classes.sheet}>
          <button onClick={() => handleNavigation("/profile")}>
            <User className={classes.userIcon} color="hsl(52, 100%, 50%)" />
            Profile
          </button>
          <button onClick={() => handleNavigation("/gamemodes")}>
            📌Gamemodes
          </button>
          <button onClick={() => handleNavigation("/leaderboard")}>
            🏆Leaderboard
          </button>
          <button onClick={() => {
            if (showCredits) {
              setShowDropDown(false);
              return;
            } 
            toggleCredits();
            setShowDropDown(false);
          }}>
            💛Credits
          </button>
          <button>😢Logout</button>
        </Sheet>
      )}
    </div>
  );
}

export default Navbar;
