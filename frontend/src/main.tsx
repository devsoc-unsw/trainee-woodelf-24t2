import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';
import App from './App.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import PlayPage from './pages/PlayPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <div>error</div>,
    children: [
      {
        path: '/login',
        element: <LoginPage/>,
      },
      {
        path: '/home',
        element: <HomePage/>,
      },
      {
        path: '/play',
        element: <PlayPage/>,
      },
      {
        path: '/profile',
        element: <ProfilePage/>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
