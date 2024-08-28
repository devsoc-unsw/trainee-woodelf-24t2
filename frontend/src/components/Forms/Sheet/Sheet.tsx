import classes from "./Sheet.module.scss";
import { X } from "lucide-react";

interface SheetProps {
  hasCloseButton?: () => void;
  children?: React.ReactNode;
}

function Sheet(props: SheetProps) {
  return (
    <div className={classes.container}>
      <div className={classes.sheet}>
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
