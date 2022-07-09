const CracoAlias = require("craco-alias");
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
	devServer: {
		https: false,
		proxy: {
			'/geoserver': {
				target: `https://dev.zjzsmap.com`,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^geoserver': ''
				// }
			},
			'/jxnt/tile': {
				target: `https://dev.zjzsmap.com`,
				changeOrigin: true,
				// pathRewrite: {
				// 	'^geoserver': ''
				// }
			},
		}
	},
	webpack: {
		configure: (webpackConfig, { env, paths }) => {

			if (process.env.NODE_ENV == "production") {

				webpackConfig.devtool = false;

				paths.appBuild = 'dist';
				webpackConfig.output = {
					...webpackConfig.output,
					path: path.resolve(__dirname, 'dist'),
					// publicPath: '/jxnt/'
					publicPath: '/'
				};
			} else {
				webpackConfig.devtool = "eval-cheap-module-source-map";

			}

			return webpackConfig;
		},

		plugins: [
			// new BundleAnalyzerPlugin()
		],
	},
	babel: { // 支持装饰器
		plugins: [
			[
				"import",
				{
					"libraryName": "antd",
					"libraryDirectory": "es",
					"style": 'css' // 设置为true即是less 这里用的是css
				}
			],
			["import", {
				"libraryName": "antd-mobile",
				"libraryDirectory": "es/components",
				"style": false
			}],
			[
				"@babel/preset-env",
				{
					"targets": {
						"chrome": "49",
						"ios": "10"
					}
				}
			],
			["@babel/plugin-proposal-class-properties"],
			["@babel/plugin-proposal-private-property-in-object"],
			["@babel/plugin-proposal-private-methods"],
			// "react-activation/babel",
		],
		"assumptions": {
			// "setPublicClassFields": false,
			"privateFieldsAsProperties": true,
			"setPublicClassFields": true,
		}
	},
	plugins: [

		{ // 配置别名
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				tsConfigPath: './tsconfig.extend.json',
			}
		},
		{ // 配置全局变量
			plugin: sassResourcesLoader,
			options: {
				resources: './src/assets/css/themes/index.scss',
			},
		}

	]
};
