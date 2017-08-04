const path = require("path");
const webpack = require("webpack");
const firebaseConfig = process.env.TRAVIS_TAG
  ? {
      apiKey: "AIzaSyDGL-so34ZsCcf_TOsRIfbzfmUy0QXzb9g",
      authDomain: "toxicavenger-a5a9a.firebaseapp.com",
      databaseURL: "https://toxicavenger-a5a9a.firebaseio.com",
      projectId: "toxicavenger-a5a9a"
    }
  : null;

module.exports = {
  entry: "./src/index.js",
  output: { filename: "bundle.js", path: path.resolve(__dirname, "public") },
  resolve: { extensions: [".ts", ".tsx", ".jsx", ".js"] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "awesome-typescript-loader"]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      FIREBASE_CONFIG: JSON.stringify(firebaseConfig)
    })
  ]
};
