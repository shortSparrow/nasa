const launches = new Map();

let latestFLightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFLightNumber++;

  launches.set(
    latestFLightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      flightNumber: latestFLightNumber,
      customer: ["Zero To Mastery", "NASA"],
    })
  );
}

function getLaunchById(id) {
  return launches.get(id);
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}

module.exports = {
  getAllLaunches,
  getLaunchById,
  abortLaunchById,
  addNewLaunch,
};
