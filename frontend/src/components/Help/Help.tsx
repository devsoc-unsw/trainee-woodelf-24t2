import classes from "./Help.module.scss";
import { X } from "lucide-react";
import Sheet from "../Sheet/Sheet";

function Help({ onClick }: { onClick: () => void }) {
  return (
    <Sheet help>
      <button className={classes.close} onClick={onClick}>
        <X />
      </button>
      <h1 className="title">How to Play</h1>
      <h2 className={classes.h2}>Gamemodes</h2>
      <p className={classes.text}>
        There will be two gamemodes to choose as of now, one which is
        exploration and timed. The exploration will be have no timer and allow
        you to experience the game without fear of running out of time. The
        timed is for more veteran students seeking a challenge.
      </p>
      <h2 className={classes.h2}>Gameplay</h2>
      <p className={classes.text}>
        You will start of at a random location at UNSW, which you will then have
        a map located at the bottom right of your screen, your role is to put a
        marker where you think is closest to where you are. The closer you are
        the higher score you'll yield. There will be eight rounds of this and
        you will receive your final score at the end!
      </p>
      <h2 className={classes.h2}>Outro</h2>
      <p className={classes.text}>
        We hope you enjoy this very WIP game, we aim to improve it as time goes
        on so any feedback would be greatly appreciated.
      </p>
    </Sheet>
  );
}

export default Help;
