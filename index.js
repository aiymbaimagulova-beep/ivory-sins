import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Lookbook from './pages/Lookbook';
import Login from './pages/Login';
import Shop from './pages/Shop';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'profile', element: <Profile /> },
        { path: 'cart', element: <Cart /> },
        { path: 'lookbook', element: <Lookbook /> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
