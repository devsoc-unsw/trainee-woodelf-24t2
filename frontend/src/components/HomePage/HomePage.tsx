// @ts-ignore
import ReactPannellum, { isLoaded } from "react-pannellum";
import panoramaImage from "./testimage.png";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./HomePage.scss";
import { useEffect, useState } from "react";

function HomePage() {
  const [isPanoramaLoaded, setIsPanoramaLoaded] = useState(false);

  useEffect(() => {
    const checkLoaded = setInterval(() => {
      if (isLoaded()) {
        console.log("running");
        setIsPanoramaLoaded(true);
        clearInterval(checkLoaded);
      }
      console.log("checking");
    }, 5000);
    return () => clearInterval(checkLoaded);
  }, []);

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
    width: "110vw",
    height: "110vh",
    filter: "blur(12px)",
    left: "-5px",
    top: "20px",
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
      />
    </div>
  );
}

export default HomePage;
