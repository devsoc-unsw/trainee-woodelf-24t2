import classes from "./Sheet.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";

interface SheetProps {
  hasCloseButton?: () => void;
  children?: React.ReactNode;
  login?: boolean;
  gamemode?: boolean;
  leaderboard?: boolean;
  credits?: boolean;
  help?: boolean;
  dropdownNavbar?: boolean;
  className?: string;
}

function Sheet(props: SheetProps) {
  return (
    <div className={
      props.className ? props.className : ''
    }>
      <div
        className={classNames({
          [classes.containerLogin]: props.login,
          [classes.containerGamemode]: props.gamemode,
          [classes.containerLeaderboard]: props.leaderboard,
          [classes.containerCredits]: props.credits,
          [classes.containerDropdownNavbar]: props.dropdownNavbar,
          [classes.containerHelp]: props.help,
        })}
      >
        <div
          className={classNames({
            [classes.sheetLogin]: props.login,
            [classes.sheetGamemode]: props.gamemode,
            [classes.sheetLeaderboard]: props.leaderboard,
            [classes.sheetCredits]: props.credits,
            [classes.sheetDropdownNavbar]: props.dropdownNavbar,
            [classes.sheetHelp]: props.help,
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
    </div>
  );
}

export default Sheet;
