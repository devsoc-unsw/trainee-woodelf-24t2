import "@fontsource/hammersmith-one";
import "./App.scss";
// import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Login/>
      {/* <HomePage/> */}
    </>
);
}

export default App;
