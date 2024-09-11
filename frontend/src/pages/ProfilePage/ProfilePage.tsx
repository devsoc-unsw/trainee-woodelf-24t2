import BoxOne from "../../components/ProfileBoxes/BoxOne";
import BoxTwo from "../../components/ProfileBoxes/BoxTwo";
import BoxThree from "../../components/ProfileBoxes/BoxThree";
import classes from "./ProfilePage.module.scss";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  setIsPanoramaLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}


const ProfilePage = () => {
    const [username, setUsername] = useState(''); // To store the username
    const { setIsPanoramaLoaded } = useOutletContext<OutletContext>();
   
  useEffect(() => {
    // Set the loading state when the page is first rendered
    setIsPanoramaLoaded(false);

    // Simulate loading process (like fetching data or loading resources)
    const timer = setTimeout(() => {
      // Once loaded, indicate that panorama is fully loaded
      setIsPanoramaLoaded(true);
    }, 3000); // Simulate a 3-second loading

    return () => clearTimeout(timer); // Clean up on unmount
  }, [setIsPanoramaLoaded]);


  let dataPromise = fetch('/user', {method: "GET"});
  dataPromise.then((res) => {
    return res.json()
  })
  .then((jsonData) => {
    setUsername(jsonData);
  })
  .catch((error) => {
    console.error('Error fetching username:', error);
    setUsername('Guest');
  })


  return (
    <>
        <p> hello </p>
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
