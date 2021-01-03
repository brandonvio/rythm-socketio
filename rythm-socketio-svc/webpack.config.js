const path = require("path");
const SRC_DIR = path.resolve(__dirname, "dist");
const OUT_DIR = path.resolve(__dirname, "build");

const config = {
  entry: {
    index: path.resolve(SRC_DIR, "Server.js"),
  },
  externals: ["aws-sdk", "bufferutil", "utf-8-validate"],
  output: {
    path: OUT_DIR,
    filename: "Server.js",
    library: "[name]",
    libraryTarget: "umd",
  },
  target: "node",
};

module.exports = config;
