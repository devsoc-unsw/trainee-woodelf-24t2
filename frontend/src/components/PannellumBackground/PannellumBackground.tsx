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
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        style={style}
        imageSource={"https://firebasestorage.googleapis.com/v0/b/yellowshirt-24t2-training.appspot.com/o/levels%2Funsw%2FIMG_20240803_125023_00_031.jpg?alt=media&token=7f607942-d19f-4674-9627-e882ad132524"}
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
