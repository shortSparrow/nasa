const launches = require("./launches.mongo.js");
const planets = require("./planets.mongo.js");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function getAllLaunches() {
  return await launches.find({}, { __v: 0, _id: 0 });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber"); // - DESC order

  return latestLaunch.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    flightNumber: newFlightNumber,
    customers: ["Zero To Mastery", "NASA"],
  });
  saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
  try {
    const planet = await planets.find({ keplerName: launch.target });

    if (!planet) {
      throw new Error("No matching planed found");
    }

    await launches.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      { upsert: true }
    );
  } catch (err) {
    console.log(`Failed save launch: ${err}`);
  }
}

async function getLaunchById(launchId) {
  return launches.findOne({ flightNumber: launchId });
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    { upcoming: false, success: false }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  getLaunchById,
  abortLaunchById,
  addNewLaunch,
};
