const Event = require("../models/Event");

// Organizer creates event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user.id,
      availableSeats: req.body.totalSeats,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin approves event
exports.approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: get approved events
exports.getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: get All Events for Admin Dashboard
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: get pending events for Admin Dashboard events
exports.getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "pending" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get events created by logged-in organizer
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
