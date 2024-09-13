import React, {MouseEventHandler} from 'react'
import classes from './ProfileDropdownItem.module.scss'

export default function ProfileDropDownItems (props: {text: string, children?: React.ReactNode, handleClick: MouseEventHandler<HTMLDivElement>}) {

  return (
    <div className={classes.dropDownItem} onClick={props.handleClick}>
      {props.children}
      <button className={classes.dropDownText}>{props.text}</button>
    </div>
  );
}
