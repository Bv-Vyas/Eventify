const Booking = require("../models/Booking");
const Event = require("../models/Event");

// User books an event
exports.bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event || event.status !== "approved") {
      return res.status(404).json({ message: "Event not available" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId: event._id,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this event",
      });
    }

    // Generate ticket ID
    const ticketId = `EVT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const booking = await Booking.create({
      userId: req.user.id,
      eventId: event._id,
      ticketId,
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      message: "Booking successful",
      ticketId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "eventId",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
