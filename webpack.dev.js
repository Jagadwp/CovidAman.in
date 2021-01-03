const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/template.html",
			filename: "index.html",
		})
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	mode: "development",
	module: {
		rules: [
			/* style and css loader */
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			// html-loader
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			//file loader
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "imgs",
							esModule: false,
						},
					},
				],
			},
		],
	},
};
