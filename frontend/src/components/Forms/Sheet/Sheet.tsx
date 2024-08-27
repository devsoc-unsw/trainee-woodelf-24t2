import classes from "./Sheet.module.scss";
import { X } from "lucide-react";
import classNames from "classnames";

interface SheetProps {
  hasCloseButton?: () => void;
  children?: React.ReactNode;
  sheetLogin?: boolean;
  sheetGamemode?: boolean;
}

function Sheet(props: SheetProps) {
  return (
    <div
      className={classNames({
        [classes.containerLogin]: props.sheetLogin,
        [classes.containerGamemode]: props.sheetGamemode,
      })}
    >
      <div
        className={classNames({
          [classes.sheetLogin]: props.sheetLogin,
          [classes.sheetGamemode]: props.sheetGamemode,
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
