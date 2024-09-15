// @ts-ignore
import ReactPannellum from "react-pannellum";
import React from "react";

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
    position: "fixed",
    width: "100vw",
    height: "100vh",
    filter: "blur(12px)",
    transform: "scale(1.1)",
    zIndex: "-1",
    PointerEvents: "none",
  };

  return (
    <>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        style={style}
        imageSource={"https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media"}
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
