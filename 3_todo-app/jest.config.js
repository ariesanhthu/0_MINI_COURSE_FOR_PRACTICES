// jest.config.js
const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });  // thư mục dự án gốc

module.exports = createJestConfig({
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Cho alias "@/components/..."
    "^@/(.*)$": "<rootDir>/$1",
    // Giả CSS Modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  }
});
