const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.jsx"
	},
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "./dist")
	},
	module: {
		rules: [{
			test:/\.(scss|css)$/,
			use: ["style-loader","css-loader","sass-loader"]
		},{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: ["babel-loader"]
		}]
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: "./dist",
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "React-Redux-Todo-Example",
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		runtimeChunk: "single"
	}

};
