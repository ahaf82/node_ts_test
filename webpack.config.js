const path = require('path');
const {
	NODE_ENV = 'production',
} = process.env;
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


module.exports = {
	entry: './src/index.ts',
	mode: NODE_ENV,
	target: 'node',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					'ts-loader',
				]
			}
		]
	},
	externals: [nodeExternals()],
	watch: NODE_ENV === 'development',
	plugins: [
		new WebpackShellPluginNext({
			onBuildStart: {
				scripts: ['echo "===> Starting packing with WEBPACK 5"'],
				blocking: true,
				parallel: false
			},
			onBuildEnd: {
				scripts: ['yarn run:dev'],
				blocking: false,
				parallel: true
			}
		})
	]
}