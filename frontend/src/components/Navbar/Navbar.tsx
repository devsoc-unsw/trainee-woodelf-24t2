import classes from "./Navbar.module.scss";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div>
        <button>
          <Logo size="lg" />
        </button>
        <button>
          Gamemodes
        </button>
        <button>
          Help
        </button>
      </div>
      <div>
        <button>
          Credits
        </button>
          <ProfileIcon url="/yellowshirt.svg" />
      </div>
    </nav>
  );
}

export default Navbar;
