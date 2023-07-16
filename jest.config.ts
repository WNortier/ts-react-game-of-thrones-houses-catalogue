const config = {
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  verbose: true,
  preset: "ts-jest",
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
};

export default config;