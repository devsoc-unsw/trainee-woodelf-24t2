import React, {MouseEventHandler} from 'react'
import classes from './ProfileDropdownItem.module.scss'

export default function ProfileDropDownItems (props: {href: string, text: string, children?: React.ReactNode, handleClick: MouseEventHandler<HTMLDivElement>}) {
  return (
    <div className={classes.dropDownItem} onClick={props.handleClick}>
      <button className={classes.dropDownText}>{props.text}</button>
      {props.children}
      <a href={props.href} className={classes.dropDownText}>
        {props.text}
      </a>
    </div>
  );
}
