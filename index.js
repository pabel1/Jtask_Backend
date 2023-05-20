// external import

const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
// internal import

const errorMiddleware = require("./Middleware/errorMiddleware");

// environment variable setup
dotenv.config();

// for mongoose deprication warning
mongoose.set("strictQuery", true);
// database connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Database connected with ${data.connection.host}`);
  });

// creating an app
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());

// Handeling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Uncaught Exception");
  process.exit(1);
});

// route setup

// error middleware
app.use(errorMiddleware);

// default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

// listening port
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.IO
const io = socket(server);

// Set up Socket.IO connection and handle events
io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);
  // Handle socket events here
});

// Unhandeled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
