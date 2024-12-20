import { createPortal } from "react-dom";
import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { useEffect, useState } from "react";
import Credits from "../Credits/Credits";
import Help from "../Help/Help";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sheet from "../Sheet/Sheet";
import classNames from "classnames";

function Navbar() {
  const [showCredits, setShowCredits] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleCredits = () => {
    setShowHelp(false);
    setShowCredits((prev) => !prev);
    setTimeout(() => {
      (document.getElementById("overlay-root") as HTMLElement).style.display =
        showCredits ? "none" : "flex";
    }, 10);
  };

  const toggleHelp = () => {
    setShowCredits(false);
    setShowHelp((prev) => !prev);
    setTimeout(() => {
      (document.getElementById("overlay-root") as HTMLElement).style.display =
        showHelp ? "none" : "flex";
    }, 10);
  };

  const handleNavigation = (path: string) => {
    setShowDropDown(false);
    navigate(path);
  };

  useEffect(() => {
    const getUsername = async () => {
      const resp = await fetch("https://yellowshirt-backend.fly.dev/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (resp.ok) {
        return resp.json().then((r) => {
          setUsername(r.username);
        });
      }
    };
    getUsername();
  }, []);

  return (
    <div>
      <nav className={classes.navbar}>
        <div>
          <button
            className={`${classes.hover} ${classes.logo}`}
            onClick={() => handleNavigation("/gamemodes")}
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
            onClick={toggleHelp}
          >
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
            {showProfileDropDown && <ProfileDropdown username={username} />}
          </div>
        </div>
        {showCredits &&
          createPortal(
            <Credits onClick={toggleCredits} />,
            document.getElementById("overlay-root") as HTMLElement,
          )}
        {showHelp &&
          createPortal(
            <Help onClick={toggleHelp} />,
            document.getElementById("overlay-root") as HTMLElement,
          )}
        <button
          className={classes.hamburger}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {showDropDown ? <X color="white" /> : <Menu color="white" />}
        </button>
      </nav>
      <Sheet
        dropdownNavbar
        className={classNames(classes.sheet, {
          [classes.slide_in]: showDropDown,
          [classes.slide_out]: !showDropDown,
        })}
      >
        <button onClick={() => handleNavigation("/profile")}>Profile</button>
        <button onClick={() => handleNavigation("/gamemodes")}>
          Gamemodes
        </button>
        <button onClick={() => handleNavigation("/leaderboard")}>
          Leaderboard
        </button>
        <button
          onClick={() => {
            if (showCredits) {
              setShowDropDown(false);
              return;
            }
            toggleCredits();
            setShowDropDown(false);
          }}
        >
          Credits
        </button>
        <button>Logout</button>
      </Sheet>
    </div>
  );
}

export default Navbar;
