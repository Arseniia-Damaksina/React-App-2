module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    ".+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta", 
              options: {
                metaObjectReplacement: { url: "https://www.url.com" },
              },
            },
          ],
        },
      },
    ],
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
