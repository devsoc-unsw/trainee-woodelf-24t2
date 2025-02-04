// import "@photo-sphere-viewer/core/index.css";
import { createRef, useContext, useEffect, useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { GameContextTypes } from "../../interfaces";
import { GameContext } from "../../pages/PlayPage/PlayPage";
import classes from "./Panorama.module.scss";

export default function Panorama() {
  const { currentLevel } = useContext<GameContextTypes>(GameContext);

  return (
    <>
      <div className={classes.panoContainer}>
        <ReactPhotoSphereViewer
          containerClass="panoContainer"
          navbar={false}
          src={currentLevel.photoLink}
          height={"100vh"}
          width={"100%"}
        ></ReactPhotoSphereViewer>
      </div>
    </>
  );
}
