const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "tracker.db");

const establishDbConnection = async () => {
  return await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

module.exports = establishDbConnection;
