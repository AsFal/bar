const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    }
  } 
};
