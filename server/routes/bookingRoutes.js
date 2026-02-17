const express = require("express");
const router = express.Router();
const {
  bookEvent,
  getMyBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:eventId", protect, bookEvent);
router.get("/my", protect, getMyBookings);

module.exports = router;
