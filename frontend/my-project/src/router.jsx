import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Room from "./Pages/Room";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import NavBar from "./Pages/NavBar";

// This component handles redirection for authenticated users
const RedirectIfAuthenticated = ({ children }) => {
  const { isAuth, activated } = useSelector((store) => store.user);

  if (isAuth && activated) {
    return <Navigate to="/room" replace />;
  }

  if (isAuth && !activated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

// This component protects routes meant only for guests (non-authenticated users)
const GuestRoute = ({ children }) => {
  const { isAuth, activated } = useSelector((store) => store.user);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (isAuth && activated) {
    return <Navigate to="/room" />;
  }

  return children || <Outlet />;
};

// This component ensures only activated and authenticated users can access the Room
const RoomRoute = () => {
  const { isAuth, activated } = useSelector((store) => store.user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!activated) {
    return <Navigate to="/profile" />;
  }

 
  return (
    <>
      <NavBar />
      <Room />
    </>
  );
};

const Routing = () => {
  const { loading } = useLoadingWithRefresh();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "/login",
      element: (
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      ),
    },
    {
      path: "/profile",
      element: (
        <GuestRoute>
          <Profile />
        </GuestRoute>
      ),
    },
    {
      path: "/room",
      element: <RoomRoute />, // NavBar will only be shown here
    },
  ]);

  return loading ? <div>Loading...</div> : <RouterProvider router={router} />;
};

export default Routing;
