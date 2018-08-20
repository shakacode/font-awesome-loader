const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./index.js"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: "file-loader"
      },
      {
        test: /font-awesome\.config\.js/,
        use: [{ loader: "style-loader" }, { loader: "font-awesome-loader" }]
      }
    ]
  }
};
