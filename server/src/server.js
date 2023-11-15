const app = require("./app");
const http = require("http");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
// server.listen(PORT, "localhost", () => {
//   console.log("Listening server on port: ", PORT);
// });

async function startsServer() {
  await loadPlanetsData();
  app.listen(PORT, "localhost", () => {
    console.log("Listening app on port: ", PORT);
  });
}

startsServer()