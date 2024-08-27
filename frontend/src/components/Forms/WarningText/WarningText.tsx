import classes from "./WarningText.module.scss";

interface WarningTextProps {
  text: string;
  paddingBottom: number;
}

function WarningText(props: WarningTextProps) {
    return (
        <div className={classes.warning} style={props.paddingBottom ? {paddingBottom: `${props.paddingBottom}px`} : {}}>{props.text}</div>
    );
}

export default WarningText;
