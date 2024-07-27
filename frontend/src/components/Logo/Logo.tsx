import classes from './Logo.module.css';

type Level = 'small' | 'medium' | 'large';

interface LogoProps {
  level: Level;
}

function Logo({ level }: LogoProps) {
  let size: number;
  switch (level) {
    case 'small':
      size = 1;
      break;
    case 'medium':
      size = 1.5;
      break;
    case 'large':
      size = 2;
      break;
  }

  return (
    <h1 className={classes.logo} style={{ fontSize: size + 'rem' }}>
      <img
        style={{ width: size + 'rem' }}
        className={classes.iconStyle}
        src="/yellowshirt.svg"
        alt="yellowshirt"
      />
      <div className={classes.logoContents}>
        <span>yellow</span>
        <span>shirt</span>
      </div>
    </h1>
  );
}

export default Title;
