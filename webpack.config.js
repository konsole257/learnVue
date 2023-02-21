const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	devtool: 'eval',

	resolve: {
		extensions: ['.js', '.vue']
	},

    devServer: {
        static: {
            directory: path.resolve(__dirname, './public/dist/'),
        },
        port: 1000,
        open: true,
        hot: true,
		historyApiFallback: true,
    },

	entry: {
		app: {
			import: path.resolve(__dirname, './public/src/main.js'),
		},
	},

	output: {
		path: path.resolve(__dirname, './public/dist/'),
		filename: './assets/js/[name].js',
		clean: true,
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},

			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
		]
	},

	plugins: [
		new VueLoaderPlugin(),
		
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
		}),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/src/index.html',
        }),
	],
};