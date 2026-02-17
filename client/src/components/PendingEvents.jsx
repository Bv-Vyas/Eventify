import { useEffect, useState } from "react";
import API from "../api/axios";

const PendingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingEvents = async () => {
    try {
      const res = await API.get("/events/pendingEvents");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to fetch pending events");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`/events/${id}/approve`);
      fetchPendingEvents(); // refresh list
    } catch (err) {
      alert("Failed to approve event");
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading pending events...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Pending Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No pending events 🎉</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">{event.description}</p>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Seats:</strong> {event.totalSeats}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-600">
                  Pending
                </span>

                <button
                  onClick={() => handleApprove(event._id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingEvents;
