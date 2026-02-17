const express = require("express");
const router = express.Router();
const {
  createEvent,
  approveEvent,
  getApprovedEvents,
  getAllEvents,
  getPendingEvents,
  getMyEvents,
} = require("../controllers/eventController");

const {
  protect,
  isOrganizer,
  isAdmin,
} = require("../middleware/authMiddleware");

router.post("/", protect, isOrganizer, createEvent);
router.patch("/:id/approve", protect, isAdmin, approveEvent);
router.get("/approved", getApprovedEvents);
router.get("/allEvents", protect, isAdmin, getAllEvents);
router.get("/pendingEvents", protect, isAdmin, getPendingEvents);
router.get("/myEvents", protect, isOrganizer, getMyEvents);

module.exports = router;
