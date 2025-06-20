const nextJest = require("next/jest");
const createJestConfig = nextJest({
   dir: "./",
});
const customJestConfig = {
   moduleDirectories: ["node_modules", "<rootDir>/"],
   testEnvironment: "jest-environment-jsdom",
   moduleNameMapper: { "^uuid$": "uuid" },
   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = createJestConfig(customJestConfig);
