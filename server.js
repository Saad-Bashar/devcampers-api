const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const auth = require("./routes/auth");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Routes files
// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

const app = express();
// Boder Perser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
