import classes from "./Credits.module.scss";
import { X } from "lucide-react";

function Credits({ onClick }: { onClick: () => void }) {
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <button className={classes.close} onClick={onClick}>
          <X />
        </button>
        <h1 className={classes.title}>Credits</h1>
        <ul className={classes.creditstext}>
          <li>Alyssa Cheong</li>
          <li>Ben Godwin</li>
          <li>Chris Wong</li>
          <li>Lachlan Shoesmith</li>
          <li>Osvaldo Prajitno</li>
        </ul>
      </div>
    </div>
  );
}

export default Credits;
