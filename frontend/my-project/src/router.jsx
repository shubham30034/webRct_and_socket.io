import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Room from "./Pages/Room";
import Home from "./Pages/Home";
import { Navigate, Outlet } from "react-router-dom";


const accessToken = false; 
const profileToken = false; 

const RedirectIfAuthenticated = ({ children }) => {
  if (accessToken && profileToken) {
    return <Navigate to="/" replace />;
  }

  if(accessToken && !profileToken){
    return <Navigate to="/profile" replace />;
  }

  return children;
};

const GuestRoute = ({ children }) => {
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }


  if(accessToken && profileToken){
    return <Navigate to="/room"/>
  }

  return children ? children : <Outlet />;
};


const RoomRoute = () => {
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (!profileToken) {
    return <Navigate to="/profile" />;
  }

  return <Room />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <RoomRoute />,
  },
]);

export default router;
