import classes from "./Sheet.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";

interface SheetProps {
  hasCloseButton?: () => void;
  children?: React.ReactNode;
  login?: boolean;
  gamemode?: boolean;
  leaderboard?: boolean;
}

function Sheet(props: SheetProps) {
  return (
    <div
      className={classNames({
        [classes.containerLogin]: props.login,
        [classes.containerGamemode]: props.gamemode,
        [classes.containerLeaderboard]: props.leaderboard,
      })}
    >
      <div
        className={classNames({
          [classes.sheetLogin]: props.login,
          [classes.sheetGamemode]: props.gamemode,
          [classes.sheetLeaderboard]: props.leaderboard,
        })}
      >
        {props.hasCloseButton && (
          <button className={classes.close} onClick={props.hasCloseButton}>
            <X />
          </button>
        )}
        {props.children}
      </div>
    </div>
  );
}

export default Sheet;
