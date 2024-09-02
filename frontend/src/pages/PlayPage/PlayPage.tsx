// TODO: change to actual import
import { MazeMap } from "../../../../../mazemap-react";

function PlayPage() {
  return (
    <>
      <MazeMap
        campuses={111}
        zoom={14.5}
        height="100vh"
        width="100vw"
        center={{ lng: 151.23140898946815, lat: -33.91702431505671 }}
      />
    </>
  );
}

export default PlayPage;
