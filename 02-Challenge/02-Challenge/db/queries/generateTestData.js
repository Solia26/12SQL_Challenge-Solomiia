const pool = require("../db");
const fs = require("fs");
const path = require("path");


const generateTestData = async () => {
  try {
    const createTables = fs.readFileSync(
      path.resolve(__dirname,"..", "schema.sql"),
      "utf-8"
    );
    await pool.query(createTables);

    const seedQuery = fs.readFileSync(
      path.resolve(__dirname, "..", "seed.sql"),
      "utf-8"
    );
    await pool.query(seedQuery);
  } catch (error) {
    console.log("generateTestDataError:", error);
  }
  console.log("Database seeded!");
};

module.exports = generateTestData;
