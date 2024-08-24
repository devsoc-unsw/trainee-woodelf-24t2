// @ts-ignore
import ReactPannellum, { isLoaded } from "react-pannellum";
import panoramaImage from "./testimage.png";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./HomePage.scss";
import { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";

function HomePage() {
  const [isPanoramaLoaded, setIsPanoramaLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

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
    position: "absolute",
    width: "104vw",
    height: "104vh",
    filter: "blur(12px)",
    left: "-2vw",
    top: "-2vh",
    zIndex: "-1",
    PointerEvents: "none",
  };

  return (
    <>
      {!isPanoramaLoaded && <LoadingScreen />}
      <div id="overlay-root" />
      {showRegister && (
        <RegisterPage
          onClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
      {showLogin && (
        <LoginPage
          onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
        />
      )}
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        style={style}
        imageSource={panoramaImage}
        config={config}
        onPanoramaLoaded={() => {
          // there is a delay between when the 'panorama loaded' event occurs
          // and the actual loading of the panorama; this timer covers that gap
          // by waiting a little longer
          setTimeout(() => {
            setIsPanoramaLoaded(true);
          }, 500);
        }}
      />
    </>
  );
}

export default HomePage;
