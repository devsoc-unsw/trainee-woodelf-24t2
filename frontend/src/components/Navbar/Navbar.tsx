import classes from "./Navbar.module.css";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div>
        <Logo size="lg" />
        <div>Gamemodes</div>
        <div>Help</div>
      </div>
      <div>
        <div>Credits</div>
        <ProfileIcon url="/yellowshirt.svg" />
      </div>
    </nav>
  );
}

export default Navbar;
