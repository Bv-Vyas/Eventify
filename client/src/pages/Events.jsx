import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/approved");
      setEvents(res.data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (eventId) => {
    //If not logged in
    if (!token) {
      toast.info("Please login to book ticket 🎟️");

      setTimeout(() => {
        navigate("/login");
      }, 2000); // wait 2 seconds

      return;
    }

    try {
      const res = await API.post(`/bookings/${eventId}`);

      toast.success(`Booking successful! 🎉`);
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading events...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 py-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-4">
        Events
      </h2>

      <p className="text-center text-gray-500 mb-12">
        Discover exciting events and book your seat today
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {events.map((event) => {
          const availableSeats = event.availableSeats ?? 0;
          const isSoldOut = availableSeats <= 0;

          return (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
            >
              {/* Top Gradient Section */}
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-sm opacity-90 mt-1">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  📍 {event.location}
                </p>

                {/* Seats Section */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Seats Available</span>
                    <span
                      className={
                        !isSoldOut ? "text-emerald-600" : "text-red-600"
                      }
                    >
                      {availableSeats}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        !isSoldOut ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (availableSeats / (event.totalSeats || 1)) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  disabled={isSoldOut}
                  onClick={() => handleBooking(event._id)}
                  className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-white transition ${
                    isSoldOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
                  }`}
                >
                  {isSoldOut ? "Sold Out" : "Book Ticket 🎟️"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
