// external import

const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require("http");
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

let server = http.createServer(app);
const io = socket(server);

// Set up Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle device control events
  // socket.on('toggleDevice', deviceController.toggleDevice);
  // socket.on('setFanRPM', deviceController.setFanRPM);
  // socket.on('setTemperature', deviceController.setTemperature);

  // Handle other socket events as needed

  // Socket.IO client disconnection handling
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

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
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Unhandeled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Unhandled Promise Rejection");

  // server.close(() => {
  //   process.exit(1);
  // });
});
