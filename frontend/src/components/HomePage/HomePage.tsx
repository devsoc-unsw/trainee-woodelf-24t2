// @ts-ignore
import ReactPannellum, { isLoaded } from "react-pannellum";
import panoramaImage from "./testimage.png";
import Navbar from "../Navbar/Navbar";
import "./HomePage.scss";

function HomePage() {
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
    top: "2vh",
    zIndex: "0",
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div id="overlay-root"></div>
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
