const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to the database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Route files
const urlRoute = require("./routes/url");
const indexRoute = require("./routes/index");

// Define routes
app.use("/api/url", urlRoute);
app.use("/", indexRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
