import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';

import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    errorElement: <div>error</div>,
    children: [
      {
        path: '/play',
        element: <div>Playing the game</div>,
      },
      {
        path: '/profile/:id',
        element: <div>Profile person</div>,
      },
    ],
  },
]);

function NavbarWrapper(){
  return (
  <div>
      <Navbar/>
      <App/>
  </div>
  )
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
