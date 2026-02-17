import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-28 px-6 text-center">
      <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
        Discover, Book & Manage
        <span className="text-indigo-600 block md:inline">
          {" "}
          Events Seamlessly
        </span>
      </h2>

      <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
        Eventify is a modern event booking and management platform that connects
        attendees, organizers, and admins in one seamless system.
      </p>

      <div className="flex justify-center gap-5 flex-wrap">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard/user-all-events"
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Explore Events
            </Link>

            <Link
              to="/dashboard"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl text-lg font-medium hover:bg-indigo-50 transition"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/events"
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Explore Events
            </Link>

            <Link
              to="/login"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl text-lg font-medium hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
