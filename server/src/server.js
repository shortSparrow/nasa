const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
require('dotenv').config();

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection is ready!");
});


mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startsServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, "localhost", () => {
    console.log("Listening app on port: ", PORT);
  });
}

startsServer();
