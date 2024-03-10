import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/style.css";
import App from './App';
import { Pages } from './api/pages';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
]);

export const pages = new Pages();

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(<RouterProvider router={router} />);