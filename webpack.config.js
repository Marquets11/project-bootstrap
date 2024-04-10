const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 8000,
  },
  entry: {
    bundle: "./src/js/index.js",
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "imgs/[contenthash][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home.html",
      chunks: ["bundle"],
      favicon: "./src/images/favicon.png",
      filename: "./index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/falcon9.html",
      chunks: ["bundle"],
      favicon: "./src/images/favicon.png",
      filename: "./falcon9.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/human-space-flight.html",
      chunks: ["bundle"],
      favicon: "./src/images/favicon.png",
      filename: "./human-space-flight.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
