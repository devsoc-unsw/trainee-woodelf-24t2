import "@fontsource/hammersmith-one";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"



function App() {
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //     setTimeout(() => setLoading(false), 3300)
  // }, [])
  // if (loading) {
  //     return <LoadingScreen/>
  // }


  return (
    <>
      <HomePage />
    </>
);
}

export default App;
