// migrate-mongo-config.js

// 1. Load your .env file
// Adjust the path (../../.env) if your config file is inside 'server/' and .env is in the project root.
require("dotenv").config({ path: ".env" });

const config = {
  mongodb: {
    // 2. Use the MONGO_URI from your .env file
    url: process.env.MONGO_URL,
    // url: "mongodb+srv://NyanLinTun:UESmFC7gQ3dmDmX@clustern.o1vnxfo.mongodb.net/bazar?retryWrites=true&w=majority&appName=CusterN",
    databaseName: process.env.DB_NAME, // IMPORTANT: Set your actual database name

    options: {},
  },

  // 3. Ensure the directory name is correct
  migrationsDir: process.env.MIGRATE_MIGRATIONS_PATH,

  // The collection where migrate-mongo stores its state
  changelogCollectionName: process.env.MIGRATE_MONGO_COLLECTION,

  moduleSystem: "commonjs", // Since this config file is usually JS
};

module.exports = config;
