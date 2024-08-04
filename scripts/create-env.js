const fs = require("fs");
const path = require("path");

try {
  // Define the path to the .env file at the top level
  const envFilePath = path.join(__dirname, "../.env");

  // Prepare environment variables
  const envVariables = `
VITE_APP_ID=${process.env.REACT_APP_APP_ID}
VITE_FIREBASE_API_KEY=${process.env.REACT_APP_FIREBASE_API_KEY}
`;

  // Write the environment variables to the .env file
  fs.writeFileSync(envFilePath, envVariables);
  console.log(".env file created with the following content:");
  console.log(envVariables);
} catch (error) {
  console.error("Error writing .env file:", error);
  process.exit(1); // Exit with non-zero status code to indicate failure
}
