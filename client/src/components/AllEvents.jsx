import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events/allEvents"); // admin gets all events
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to fetch events", {
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`/events/${id}/approve`);
      toast.success(`Ticket Approced`, {
        autoClose: 2500,
      });
      fetchEvents(); // refresh list
    } catch (err) {
      toast.error("Failed to approve event", {
        autoClose: 2500,
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
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

              {/* Status Badge */}
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    event.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {event.status}
                </span>

                {/* Approve Button */}
                {event.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(event._id)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
