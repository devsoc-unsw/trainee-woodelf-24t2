// @ts-ignore
import ReactPannellum, { isLoaded } from "react-pannellum";
import panoramaImage from "./testimage.png";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./HomePage.scss";
import { useState } from "react";

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
    <div>
      <Navbar />
      {!isPanoramaLoaded && <LoadingScreen />}
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        style={style}
        imageSource={panoramaImage}
        config={config}
        onPanoramaLoaded={() => {
          setTimeout(() => {
            setIsPanoramaLoaded(true);
          }, 500);
        }}
      />
    </div>
  );
}

export default HomePage;
