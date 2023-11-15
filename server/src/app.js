const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");
const launchRouter = require("./routes/launches/launches.router");

const app = express();
// по суті express це просо великий лістенер, чи точніше міделварка

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("common"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use("/planets", planetRouter);
app.use("/launches", launchRouter);

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
