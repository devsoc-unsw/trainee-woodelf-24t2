import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div>
        <button className={`${classes.hover} ${classes.logo}`}>
          <Logo size="lg"/>
        </button>
        <button className={classes.hover}>Gamemodes</button>
        <button className={classes.hover}>Help</button>
      </div>
      <div>
        <button className={classes.hover}>Credits</button>
        <ProfileIcon url="/yellowshirt.svg" />
      </div>
    </nav>
  );
}

export default Navbar;
