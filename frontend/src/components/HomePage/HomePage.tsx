// @ts-ignore
import ReactPannellum from "react-pannellum";
import panoramaImage from "./testimage.png";
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
    width: "110vw",
    height: "110vh",
    filter: "blur(12px)",
    left: "-5vw",
    top: "-5vw",
  };

  return (
    <div>
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
