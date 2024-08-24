import classes from "./LoadingScreen.module.scss";
import { ring2 } from "ldrs";

ring2.register();

function LoadingScreen() {
  return (
      <div className={classes.container}>
          <l-ring-2
            size="80"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="hsl(52, 100%, 50%)"
          ></l-ring-2>
      </div>
  );
}

export default LoadingScreen;
