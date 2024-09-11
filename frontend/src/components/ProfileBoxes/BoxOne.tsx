import { useEffect, useState } from "react";
import classes from "./ProfileBoxes.module.scss";

const BoxOne = (props: { username: string; profileIcon: string }) => {

  return (
    <>
      <div className={classes.BoxOne}>
        <img
          className={classes.profileIcon}
          src={props.profileIcon}
          alt={`${props.username}'s profile picture`}
          loading="lazy"

        />
        <h1 className={classes.usernameText}>{props.username}</h1>
      </div>
    </>
  );
};

export default BoxOne;
