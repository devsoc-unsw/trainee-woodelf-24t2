import classes from './Navbar.module.css';
import Title from '../Title/Title';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

function Navbar() {
  return (
    <nav className={classes.container}>
      <div className={classes.leftStuff}>
        <Title level="large" />
      </div>
      <div className={classes.rightStuff}>
        <ProfileIcon url="/yellowshirt.svg" />
      </div>
    </nav>
  );
}

export default Navbar;
