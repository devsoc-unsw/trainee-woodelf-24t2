import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import "./App.scss";
import "@fontsource/hammersmith-one";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import PannellumBackground from './components/PannellumBackground/PannellumBackground';

function App() {
  const location = useLocation();

  // List of routes that do not include the Navbar
  const hideNavbarRoutes = ["/login", "/register"];
  const panoBackgroundRoutes = ["/login", "/register", "/profile", "/home"]

  // Determine if the Navbar should be hidden
  const hasNavbar = !hideNavbarRoutes.includes(location.pathname);
  const hasBackground = panoBackgroundRoutes.includes(location.pathname)

  const [isPanoramaLoaded, setIsPanoramaLoaded] = useState(!hasBackground);

  return (
    <>
      {hasNavbar && <Navbar/>}
      {hasBackground && <PannellumBackground setIsPanoramaLoaded={setIsPanoramaLoaded}/>}
      {!isPanoramaLoaded && <LoadingScreen/>}
      <Outlet/>
    </>
  )
}


export default App;
