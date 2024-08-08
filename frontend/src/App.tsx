import React from 'react'
import { Outlet, redirect } from 'react-router-dom';

import Navbar from "./components/Navbar/Navbar";



function App() {

  return (
    <React.Fragment>
      <Navbar/>
      <Outlet/>
    </React.Fragment>
  );
}

export default App;
