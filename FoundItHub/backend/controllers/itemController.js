const Item = require("../models/Item");
const { isEmailVerified } = require("./otpController");

// ✅ POST /api/items - Upload found item
exports.createItem = async (req, res) => {
  const { productName, description, location, category, contact, email } = req.body;
  const imageUrl = req.file?.path;

  if (!email || !(await isEmailVerified(email))) {
    return res.status(400).json({ success: false, message: "Email not verified" });
  }

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: "Image upload failed. Please select an image." });
  }

  try {
    const item = await Item.create({
      productName,
      description,
      location,
      category,
      contact,
      email,
      imageUrl,
    });

    res.status(201).json({ success: true, message: "Item posted", item });
  } catch (err) {
    console.error("❌ Error posting item:", err);
    res.status(500).json({ success: false, message: "Failed to post item" });
  }
};

// ✅ GET /api/items - Get all found items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (err) {
    console.error("❌ Error fetching items:", err);
    res.status(500).json({ success: false, message: "Failed to fetch items" });
  }
};

// ✅ GET /api/items/:id - Get single item
exports.getItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, item });
  } catch (err) {
    console.error("❌ Error fetching item:", err);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
};

// ✅ DELETE /api/items/:id - Delete item (only by same email)
exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;
  const { email } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (item.email !== email)
      return res.status(403).json({ success: false, message: "Unauthorized to delete this item" });

    await item.deleteOne();
    res.json({ success: true, message: "Item deleted" });
  } catch (err) {
    console.error("❌ Error deleting item:", err);
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
};
