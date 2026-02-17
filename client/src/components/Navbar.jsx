import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    toast.success(`Logged Out`, {
      autoClose: 2500,
    });
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-indigo-600 cursor-pointer hover:scale-105 transition"
      >
        Eventify
      </h1>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
