const express = require("express");
const dotenv = require("dotenv");

// Routes files
// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const bootcamps = require("./routes/bootcamps");

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
