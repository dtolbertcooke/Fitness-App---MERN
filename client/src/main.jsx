import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import WorkoutTracker from "./components/WorkoutTracker";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import EditWorkout from "./components/EditWorkout";
import UpdateProfile from "./components/UpdateProfile";
import DeleteProfile from "./components/DeleteProfile";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <WorkoutTracker />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/profile",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/edit",
    element: <App />,
    children: [
      {
        path: "/edit",
        element: <EditWorkout />,
      },
    ],
  },
  {
    path: "/update",
    element: <App />,
    children: [
      {
        path: "/update",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/delete",
    element: <App />,
    children: [
      {
        path: "/delete",
        element: <DeleteProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
