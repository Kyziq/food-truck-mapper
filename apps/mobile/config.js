const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Read the current app.json
const appJson = JSON.parse(fs.readFileSync("./app.json", "utf8"));

// Inject the API key into app.json
appJson.expo.android.config.googleMaps.apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Write the modified app.json back to the file system
fs.writeFileSync("./app.json", JSON.stringify(appJson, null, 2));
