import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const role = localStorage.getItem("role"); // organizer or admin

  const handleLogout = () => {
    localStorage.clear();
    toast.success(`Logged Out`, {
      autoClose: 2500,
    });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 w-64 bg-gray-900 text-white p-6 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div>
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <h2 className="text-xl font-bold capitalize">{role} Panel</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* Desktop Header */}
          <h2 className="hidden lg:block text-2xl font-bold mb-8 capitalize">
            {role} Panel
          </h2>

          <nav className="space-y-4">
            {/* User Links */}
            {role === "user" && (
              <>
                <NavLink
                  to="user-all-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  All Events
                </NavLink>

                <NavLink
                  to="user-my-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  My Events
                </NavLink>

                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Go To Home
                </NavLink>
              </>
            )}

            {/* Organizer Links */}
            {role === "organizer" && (
              <>
                <NavLink
                  to="create-event"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Create Event
                </NavLink>

                <NavLink
                  to="my-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  My Events
                </NavLink>

                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Go To Home
                </NavLink>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <NavLink
                  to="all-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  All Events
                </NavLink>

                <NavLink
                  to="approved-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Approved Events
                </NavLink>

                <NavLink
                  to="pending-events"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Pending Events
                </NavLink>

                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded transition ${
                      isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                    }`
                  }
                >
                  Go To Home
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 lg:ml-64 bg-gray-100 min-h-screen">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 capitalize">
            Welcome to {role} Dashboard
          </h1>
          <p className="text-indigo-100 text-lg">
            Manage and monitor your platform efficiently.
          </p>
        </div>

        {/* Nested Pages */}
        <div className="bg-white rounded-2xl shadow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
