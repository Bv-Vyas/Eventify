import { useEffect, useState } from "react";
import API from "../../api/axios";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const { data } = await API.get("/events/myEvents");
        setEvents(data);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) return <p>Loading your events...</p>;

  return (
    <div className="px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-8 text-indigo-600">
        Events Created By You
      </h2>

      {events.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-xl text-center shadow">
          <p className="text-gray-600 text-lg">
            You haven’t created any events yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden"
            >
              {/* Gradient Header */}
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {event.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{event.description}</p>

                {/* Date */}
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-500">📅 Date</span>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>

                {/* Seats */}
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-500">🎟 Available Seats</span>
                  <span className="font-medium">{event.availableSeats}</span>
                </div>

                {/* Status Badge */}
                <div className="mt-4 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      event.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : event.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {event.status.toUpperCase()}
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

export default MyEvents;
