import { useEffect, useState } from "react";
import API from "../../api/axios";

const UserMyEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const { data } = await API.get("/bookings/my");
        setBookedEvents(data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedEvents();
  }, []);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-8 text-indigo-600">
        My Booked Events 🎟
      </h2>

      {bookedEvents.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow">
          <p className="text-gray-600 text-lg">
            You have not booked any events yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookedEvents.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden"
            >
              {/* Top Gradient Header */}
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {booking.eventId?.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  {booking.eventId?.description}
                </p>

                {/* Date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 font-medium">
                    📅 Date
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {booking.eventId?.date
                      ? new Date(booking.eventId.date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                {/* Ticket ID */}
                <div className="bg-gray-100 p-3 rounded-lg text-center text-sm font-medium text-gray-700">
                  🎫 Ticket ID: {booking.ticketId}
                </div>

                {/* Booked Badge */}
                <div className="mt-4 text-center">
                  <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-semibold">
                    Ticket Confirmed ✅
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMyEvents;
