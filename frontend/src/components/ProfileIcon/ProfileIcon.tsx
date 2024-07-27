import classes from './ProfileIcon.module.css'

interface pic {
    url: string;
}

function ProfileIcon(props : pic) {
    return(
        <div className={classes.profileIcon}>
            <img className={classes.profile} src={props.url}/>
        </div>
    )
}

export default ProfileIcon