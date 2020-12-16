module.exports = {
	collectCoverage: true,
	coverageDirectory: "<rootDir>/.coverage",
	collectCoverageFrom: [
		"src/**/*.ts",
		"!**/node_modules/**",
	],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupFilesAfterEnv: ["jest-extended"],
};
