import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  const role = localStorage.getItem("role");

  if (role === "organizer") {
    return <Navigate to="my-events" replace />;
  }

  if (role === "admin") {
    return <Navigate to="all-events" replace />;
  }

  if (role === "user") {
    return <Navigate to="user-all-events" replace />;
  }

  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
