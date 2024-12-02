/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  coverageProvider: "v8",
  coverageReporters: ["text", "text-summary", "json-summary"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};
