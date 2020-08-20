const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Routes files
// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
