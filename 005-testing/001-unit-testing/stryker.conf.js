module.exports = function (config) {
  config.set({
    files: [
      './*.js',
      './src/*.js',
      './*.yaml',
    ],
    mutate: [
      './src/*.js',
      '!./**/*.test.js',
    ],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "mocha",
    transpilers: [],
    testFramework: "mocha",
    coverageAnalysis: "perTest"
  });
};
