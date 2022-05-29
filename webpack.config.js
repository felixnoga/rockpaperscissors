const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: {
      import: path.resolve(__dirname, "src/index.js"),
      filename: "js/[name].bundle.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "images/[hash][ext][query]",
  },
  devtool: "source-map",
  //Servidor de desarrollo
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    liveReload: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  //loaders para los estilos. Se utiliza miniCssExtract para exportar CSS a su propio archivo
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Rock Paper Scissors",
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html"),
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/static/manifest.json"),
          to: path.resolve(__dirname, "dist"),
          force: true,
        },
        {
          from: path.resolve(__dirname, "src/static/_redirects"),
          to: path.resolve(__dirname, "dist/"),
          force: true,
        },
        {
          from: path.resolve(__dirname, "src/static/images"),
          to: path.resolve(__dirname, "dist/images"),
          force: true,
        },
        {
          from: path.resolve(__dirname, "src/sw.js"),
          to: path.resolve(__dirname, "dist"),
          force: true,
        },
      ],
    }),
  ],
};
