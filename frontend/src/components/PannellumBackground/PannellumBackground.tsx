// @ts-ignore
import ReactPannellum from "react-pannellum";
import React from "react";
import panoramaImage from "/testimage.png";

function PannellumBackground({
  setIsPanoramaLoaded,
}: {
  setIsPanoramaLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
<<<<<<< HEAD:frontend/src/components/HomePage/HomePage.tsx
      {!isPanoramaLoaded && <LoadingScreen />}
      <div id="overlay-root"/>
=======
>>>>>>> 6710a078189a8cc8d98042bb50909ab983c82427:frontend/src/components/PannellumBackground/PannellumBackground.tsx
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

export default PannellumBackground;
