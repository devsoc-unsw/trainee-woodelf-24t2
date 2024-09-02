import classes from "./ProfileDropdown.module.scss";
import { Award, CircleUserRound, LogOut } from "lucide-react";
import ProfileDropDownItem from "../ProfileDropdownItem/ProfileDropdownItem";

function ProfileDropdown(props: { username: string }) {
  return (
    <div className={classes.dropDownMenu}>
      <h3 className={classes.username}>{props.username}</h3>

      <ProfileDropDownItem href="/" text="Profile">
        <CircleUserRound color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
      <ProfileDropDownItem href="/" text="Achievements">
        <Award color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
      <ProfileDropDownItem href="/" text="Logout">
        <LogOut color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
    </div>
  );
}

export default ProfileDropdown;
