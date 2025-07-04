const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST feedback
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to save feedback" });
  }
});

// GET all feedbacks
// GET only latest 4 feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(4);
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch feedbacks" });
  }
});
 // DELETE feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete feedback" });
  }
});


module.exports = router;
