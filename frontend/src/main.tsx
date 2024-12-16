import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import PlayPage from './pages/PlayPage/PlayPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage.tsx';
import GamemodesPage from './pages/GamemodesPage/GamemodesPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';

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
        path: '/gamemodes',
        element: <GamemodesPage/>,
      },
      {
        path: '/play',
        element: <PlayPage/>,
      },
      {
        path: '/register',
        element: <RegisterPage/>,
      },
      {
        path: '/leaderboard',
        element: <LeaderboardPage/>,
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
