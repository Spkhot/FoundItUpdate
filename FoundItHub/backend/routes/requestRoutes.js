// routes/requestRoutes.js
const express = require("express");
const router = express.Router();
const { createRequest, getAllRequests, deleteRequest } = require("../controllers/requestController");

router.post("/", createRequest);
router.get("/", getAllRequests);
router.delete("/:id", deleteRequest);

module.exports = router;
