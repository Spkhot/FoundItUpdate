const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const feedbackRoutes = require("./routes/feedbackRoutes");


// Import routes
const itemRoutes = require("./routes/itemRoutes");
const requestRoutes = require("./routes/requestRoutes");
const otpRoutes = require("./routes/otpRoutes");

dotenv.config();

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Go one level up from backend/
const rootPath = path.resolve(__dirname, "..");

app.use(express.static(path.join(rootPath, "public")));
app.use(express.static(path.join(rootPath, "views")));


// 📦 API Routes
app.use("/api/items", itemRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/feedbacks", feedbackRoutes);
// 🌐 Frontend Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "views", "index.html"));
});


// Optional: auto-serve all .html pages from /views
app.get("/:page", (req, res) => {
  const file = req.params.page;
  res.sendFile(path.join(rootPath, "views", file), (err) => {
    if (err) res.status(404).send("Page not found");
  });
});


// 🌍 MongoDB Connection & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log("🚀 Server running on port " + PORT)
    );
  })
  .catch((err) => console.error("❌ DB Error: ", err));
