import React from 'react'
import { Outlet } from 'react-router-dom';
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Outlet/>
    </React.Fragment>
  )
}


export default App;
