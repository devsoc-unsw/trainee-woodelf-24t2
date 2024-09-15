
import classes from "./ProfileBoxes.module.scss";
import { FaFire } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa";
import { FaTshirt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";

const BoxOne = (props: {
    username: string;
    profileIcon: string;
    highScore: number;
    cumulativeScore: number;
    shirts: number;
    dateJoined: string;
    activeDays: number;
  }) => {
    return (
      <div className={classes.BoxOne}>
        <img
          className={classes.profileIcon}
          src={props.profileIcon}
          alt={`${props.username}'s profile picture`}
        />
        <h1 className={classes.usernameText}>{props.username}</h1>

        <div className={classes.dateJoinedContainer}>
          {/* <div className={classes.iconCircle}>
            <IconContext.Provider value={{ color: "#ffffff" }}>
              <IoTimeSharp size={30} />
            </IconContext.Provider>
          </div> */}
          <p className={classes.dateJoined}>yellowshirt user since   {props.dateJoined}</p>
        </div>

        <div className={classes.leftColumn}>
          <div className={classes.highScoreContainer}>
            <div className={classes.iconCircle}>
              <IconContext.Provider value={{ color: "#ffffff" }}>
              <FaCrown size={30}/>
              </IconContext.Provider>
            </div>
            <div className={classes.highScoreRightColumn}>
              <p className={classes.bodyText}>High Score</p>
              <p className={classes.highScore}>{props.highScore}</p>
            </div>
          </div>

          <div className={classes.cumulativeScoreContainer}>
            <div className={classes.iconCircle}>
              <IconContext.Provider value={{ color: "#ffffff" }}>
                <FaStar size={30} />
              </IconContext.Provider>
            </div>
            <div className={classes.cumulativeScoreRightColumn}>
              <p className={classes.bodyText}>Total Score</p>
              <p className={classes.cumulativeScore}>{props.cumulativeScore}</p>
            </div>
          </div>
        </div>

        <div className={classes.rightColumn}>
          <div className={classes.shirtsContainer}>
            <div className={classes.iconCircle}>
              <IconContext.Provider value={{ color: "#ffffff" }}>
                <FaTshirt size={30} />
              </IconContext.Provider>
            </div>
            <div className={classes.shirtsRightColumn}>
              <p className={classes.bodyText}>Shirts</p>
              <p className={classes.shirts}>{props.shirts}</p>
            </div>
          </div>

          <div className={classes.activeDaysContainer}>
            <div className={classes.iconCircle}>
              <IconContext.Provider value={{ color: "#ffffff" }}>
                <FaFire size={30} />
              </IconContext.Provider>
            </div>
            <div className={classes.activeDaysRightColumn}>
              <p className={classes.bodyText} >Active Days</p>
              <p className={classes.activeDays}>{props.activeDays}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default BoxOne;

