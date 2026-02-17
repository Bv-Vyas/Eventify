import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./middleware/PublicRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeEventPage from "./pages/HomeEventPage";
import ProtectedRoute from "./middleware/ProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout";
import CreateEvent from "./pages/CreateEvents";
import AllEvents from "./components/AllEvents";
import ApprovedEvents from "./components/ApprovedEvents";
import PendingEvents from "./components/PendingEvents";
import UserAllEvents from "./components/user/UserAllEvents";
import UserMyEvents from "./components/user/UserMyEvents";
import MyEvents from "./components/organizer/MyEvents";
import DashboardRedirect from "./middleware/DashboardRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/events" element={<HomeEventPage />} />
        //Organizer Route
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role={["organizer", "admin", "user"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* //Redirect Route based on role */}
          <Route index element={<DashboardRedirect />} />
          {/* //Organizer Routes */}
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="my-events" element={<MyEvents />} />
          {/* //Admin routes */}
          <Route path="all-events" element={<AllEvents />} />
          <Route path="approved-events" element={<ApprovedEvents />} />
          <Route path="pending-events" element={<PendingEvents />} />
          {/* USER ROUTES */}
          <Route path="user-all-events" element={<UserAllEvents />} />
          <Route path="user-my-events" element={<UserMyEvents />} />
        </Route>
      </Routes>
      {/* // Toast Message */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}
// redeploy trigger
export default App;
