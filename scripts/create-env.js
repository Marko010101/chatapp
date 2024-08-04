const fs = require("fs");

const envVariables = `
VITE_APP_ID=${process.env.REACT_APP_APP_ID}
VITE_FIREBASE_API_KEY=${process.env.REACT_APP_FIREBASE_API_KEY}
`;

fs.writeFileSync(`${__dirname}.env`, envVariables);
