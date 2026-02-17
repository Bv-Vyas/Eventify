import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

const UserAllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get("/events/approved");
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBooking = async (eventId) => {
    try {
      setBookingLoading(eventId);

      const { data } = await API.post(`/bookings/${eventId}`);

      toast.success(
        `🎉 Ticket Booked Successfully!\nTicket ID: ${data.ticketId}`,
        {
          autoClose: 2500,
        },
      );

      // Update seats in UI instantly
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, availableSeats: event.availableSeats - 1 }
            : event,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed ❌");
    } finally {
      setBookingLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading)
    return (
      <div className="text-center text-lg font-semibold">Loading events...</div>
    );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        🎉 Available Events
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-200"
            >
              {/* Top Colored Bar */}
              <div className="h-2 bg-linear-to-r from-indigo-500 to-purple-500"></div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {event.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm">
                  <p>
                    📅 <span className="font-semibold">Date:</span>{" "}
                    {formatDate(event.date)}
                  </p>

                  <p>
                    🎟️ <span className="font-semibold">Seats:</span>{" "}
                    {event.availableSeats}
                  </p>
                </div>

                {/* Seat Status Badge */}
                {event.availableSeats === 0 && (
                  <div className="mt-4 text-center bg-red-100 text-red-600 py-1 rounded-full text-sm font-semibold">
                    Sold Out
                  </div>
                )}

                <button
                  onClick={() => handleBooking(event._id)}
                  disabled={
                    event.availableSeats === 0 || bookingLoading === event._id
                  }
                  className={`w-full mt-5 py-2 rounded-xl font-semibold transition duration-300
    ${
      event.availableSeats === 0
        ? "bg-gray-400 cursor-not-allowed text-white"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}
                >
                  {bookingLoading === event._id ? "Booking..." : "Book Ticket"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserAllEvents;
