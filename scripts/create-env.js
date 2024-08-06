import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the .env file at the top level
const envFilePath = path.join(__dirname, "../.env");

// Prepare environment variables
const envVariables = `
VITE_APP_ID=${process.env.REACT_APP_APP_ID}
VITE_FIREBASE_API_KEY=${process.env.REACT_APP_FIREBASE_API_KEY}
`;

// Write the environment variables to the .env file
fs.writeFileSync(envFilePath, envVariables);
