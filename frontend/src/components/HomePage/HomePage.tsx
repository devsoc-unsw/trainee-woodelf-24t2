// @ts-ignore
import ReactPannellum, { isLoaded } from "react-pannellum";
import panoramaImage from "./testimage.png";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./HomePage.scss";
import YellowButton from "../yellowbutton/YellowButton";
import { useState } from "react";
import ReactDOM from 'react-dom';

function HomePage() {
  const [isPanoramaLoaded, setIsPanoramaLoaded] = useState(false);

  const config = {
    type: "equirectangular",
    autoLoad: true,
    showControls: false,
    mouseZoom: false,
    draggable: false,
    keyboardZoom: false,
    showZoomCrtl: false,
    showLoadButton: false,
    autoRotate: 5,
  };

  const style = {
    width: "104vw",
    height: "104vh",
    filter: "blur(12px)",
    left: "-2vw",
    top: "-2vh",
    zIndex: "0",
  };

  return (
    <>
      {!isPanoramaLoaded && <LoadingScreen />}
      <div id="overlay-root">
        {ReactDOM.createPortal(
          <YellowButton text="Play" />, // Pass the text prop here
          document.getElementById('overlay-root')!
        )}
      </div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        style={style}
        imageSource={panoramaImage}
        config={config}
        onPanoramaLoaded={() => {
          // Wait a little longer for the panorama to actually load
          setTimeout(() => {
            setIsPanoramaLoaded(true);
          }, 500);
        }}
      />
    </>
  );
}


export default HomePage;
