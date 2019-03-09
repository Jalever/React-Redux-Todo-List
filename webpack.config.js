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
		path: path.resolve(__dirname, "dist")
	},
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader","css-loader","sass-loader"]
			},{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title:"Todo List",
			template: "./src/index.html",
			filename: "index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		}
	}
};












