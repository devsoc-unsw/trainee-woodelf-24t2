import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import "@fontsource/hammersmith-one";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // List of routes that do not include the Navbar
  const hideNavbarRoutes = ["/login", "/register", "/play"];

  // Determine if the Navbar should be hidden
  const hasNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    if (location.pathname == "/") navigate("/login");
    // should be updated when user endpoint works...
  }, [location.pathname]);

  return (
    <>
      <div id="overlay-root"></div>
      {hasNavbar && <Navbar />}
      <Outlet />
    </>
  );
}

export default App;
