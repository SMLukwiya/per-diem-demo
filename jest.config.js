/* eslint-disable @typescript-eslint/no-var-requires */
const { default: nextJest } = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "^@pages/(.*)$": "<rootDir>/pages/$1",
    "^@api-contracts/(.*)$": "<rootDir>/api-contracts/$1",
    "^@business-logic/(.*)$": "<rootDir>/business-logic/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  testEnvironment: "node",
  // collectCoverageFrom: ["**/business-logic/**"],
};

module.exports = createJestConfig(customJestConfig);
