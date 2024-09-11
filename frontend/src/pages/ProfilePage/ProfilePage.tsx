import BoxOne from "../../components/ProfileBoxes/BoxOne";
import BoxTwo from "../../components/ProfileBoxes/BoxTwo";
import BoxThree from "../../components/ProfileBoxes/BoxThree";
import classes from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";


const ProfilePage = () => {
    const [username, setUsername] = useState(''); // To store the username
  
    useEffect(() => {
      // Fetch user data from backend
      fetch('/user', {method: "GET"})
        .then((response) => {
          // If the session is not found, consider the user as a guest
          if (response.status === 404) {
            return { username: 'Guest' };
          } else if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          setUsername(data.username); // Set username (either from user data or "Guest")
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUsername('Guest'); // Default to "Guest" if an error occurs
        });
    }, []);
  
  
  return (
    <>
      <div className={classes.container}>
        <div className={classes.userProfile}>
          {/* <BoxOne username={username} profileIcon="/yellowshirt.svg"></BoxOne> */}
          <BoxOne username="Chris" profileIcon="/yellowshirt.svg"></BoxOne>
        </div>
        <div className={classes.rightColumn}>
          <BoxTwo></BoxTwo>
          <BoxThree></BoxThree>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
