import classes from "./ProfileDropdown.module.scss";
import { Award, CircleUserRound, LogOut } from "lucide-react";
import ProfileDropDownItem from "../ProfileDropdownItem/ProfileDropdownItem";
import { useNavigate } from "react-router-dom";

function ProfileDropdown(props: { username: string }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const resp = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (resp.ok) {
        // here for testing change later
        console.log("Log out success");
      } else {
        console.log(resp);
      }
      navigate("/home", { replace: true });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <div className={classes.dropDownMenu}>
      <h3 className={classes.username}>{props.username}</h3>

      <ProfileDropDownItem href="/" text="Profile" handleClick={() => {}}>
        <CircleUserRound color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
      <ProfileDropDownItem href="/" text="Achievements" handleClick={() => {}}>
        <Award color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
      <ProfileDropDownItem href="/" text="Logout" handleClick={handleClick}>
        <LogOut color="hsl(52, 70%, 50%)" strokeWidth={3} />
      </ProfileDropDownItem>
    </div>
  );
}

export default ProfileDropdown;
