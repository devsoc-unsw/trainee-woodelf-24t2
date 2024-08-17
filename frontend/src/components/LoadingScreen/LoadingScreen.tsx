import { useEffect, useState } from "react";
import classes from "./LoadingScreen.module.scss";

function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("");

  const emojis = ["", ".", "..", "...", "...."];
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(emojis[currentIndex]);
      currentIndex = (currentIndex + 1) % emojis.length;
    }, 1000000); // Adjust the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
            Loading<span className={classes.loadingText}>{loadingText}</span>
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
