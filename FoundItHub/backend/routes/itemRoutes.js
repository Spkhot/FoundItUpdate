const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
} = require("../controllers/itemController");

// ✅ Routes
router.post("/", upload.single("image"), createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.delete("/:id", deleteItem);

module.exports = router;
