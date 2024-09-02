import classes from "./Logo.module.scss";

type Size = "sm" | "md" | "lg";

interface LogoProps {
  size: Size;
}

const Logo = ({ size }: LogoProps) => {
  const fontSize = {
    sm: 1,
    md: 1.5,
    lg: 1.7,
  }[size];

  return (
    <h1 className={classes.logo} style={{ fontSize: `${fontSize}rem` }}>
      <img
        className={classes.iconStyle}
        src="/yellowshirt.svg"
        alt="yellowshirt"
        style={{ width: `${fontSize}rem` }}
      />
      <div className={classes.logoContents}>
        <span>yellow</span>
        <span>shirt</span>
      </div>
    </h1>
  );
};

export default Logo;
