import React from "react";
import classes from "./ProfileDropdownItem.module.scss";

export default function ProfileDropDownItems(props: {
  href: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={classes.dropDownItem}>
      {props.children}
      <a href={props.href} className={classes.dropDownText}>
        {props.text}
      </a>
    </div>
  );
}
