import BoxOne from "../../components/ProfileBoxes/BoxOne";

import classes from "./ProfilePage.module.scss";
import { useState } from "react";

const ProfilePage = () => {
  const [username, setUsername] = useState(""); // To store the username
  const [highScore, setHighScore] = useState(0);
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [shirts, setShirts] = useState(0);
  const [dateJoined, setDateJoined] = useState("");
  const [activeDays, setActiveDays] = useState(0);

  async function getData() {
    let dataPromise = await fetch("https://yellowshirt-backend.fly.dev/user", {
      method: "GET",
    });
    let dataJson = await dataPromise.json();
    setUsername(dataJson.username);
    setHighScore(dataJson.highScore);
    setCumulativeScore(dataJson.cumulativeScore);
    setShirts(dataJson.shirts);

    const d = new Date(dataJson.dateJoined);
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    setDateJoined(date + "/" + month + "/" + year);

    // active days
    let date1 = new Date(month + "/" + date + "/" + year);
    let date2 = new Date();
    let msDay = 1000 * 3600 * 24; // milliseconds per day
    let days = Math.round((date2.getTime() - date1.getTime()) / msDay);
    setActiveDays(days);
  }

  getData();
  return (
    <>
      <div className={classes.userProfile}>
        <BoxOne
          username={username}
          profileIcon="/yellowshirt.svg"
          highScore={highScore}
          cumulativeScore={cumulativeScore}
          shirts={shirts}
          dateJoined={dateJoined}
          activeDays={activeDays}
        ></BoxOne>
      </div>
    </>
  );
};

export default ProfilePage;
