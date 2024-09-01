import classes from "./ProfileIcon.module.scss";

interface pic {
  url: string;
}

function ProfileIcon(props: pic) {
  return (
    <div className={classes.profileIconContainer}>
      <div className={classes.profileIcon}>
        <img className={classes.profile} src={props.url} />
      </div>
    </div>
  );
}

export default ProfileIcon;
