import classes from "./LoadingScreen.module.scss";

function LoadingScreen() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.innerContainer}>Loading</div>
      </div>
    </>
  );
}

export default LoadingScreen;
