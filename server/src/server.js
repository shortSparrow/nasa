const app = require("./app");
const http = require("http");
const { connectMongoDb } = require("./services/mongo");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startsServer() {
  await connectMongoDb();
  await loadPlanetsData();
  server.listen(PORT, "localhost", () => {
    console.log("Listening app on port: ", PORT);
  });
}

startsServer();
