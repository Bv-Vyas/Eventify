import { useEffect, useState } from "react";
import API from "../api/axios";

const ApprovedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedEvents = async () => {
    try {
      const res = await API.get("/events/approved");
      setEvents(res.data);
    } catch (err) {
      alert("Failed to fetch approved events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedEvents();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading approved events...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Approved Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No approved events found.</p>
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

              <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-600">
                Approved
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedEvents;
