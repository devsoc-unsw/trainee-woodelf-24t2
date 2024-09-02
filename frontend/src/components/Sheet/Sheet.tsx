import classes from "./Sheet.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";

interface SheetProps {
  hasCloseButton?: () => void;
  children?: React.ReactNode;
  sheetLogin?: boolean;
  sheetGamemode?: boolean;
  sheetCredits?: boolean;
}

function Sheet(props: SheetProps) {
  return (
    <div
      className={classNames({
        [classes.containerLogin]: props.sheetLogin,
        [classes.containerGamemode]: props.sheetGamemode,
        [classes.containerCredits]: props.sheetCredits,
      })}
    >
      <div
        className={classNames({
          [classes.sheetLogin]: props.sheetLogin,
          [classes.sheetGamemode]: props.sheetGamemode,
          [classes.sheetCredits]: props.sheetCredits,
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
