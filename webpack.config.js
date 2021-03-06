const path = require("path");

const webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: { filename: "bundle.js", path: path.resolve(__dirname, "public") },
  resolve: { extensions: [".jsx", ".js"] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [new webpack.DefinePlugin({ FIREBASE_CONFIG: JSON.stringify(null) })]
};
