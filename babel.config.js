module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			require.resolve('expo-router/babel'),
			['react-native-reanimated/plugin'],
			[
				'module:react-native-dotenv',
				{
					envName: 'APP_ENV',
					moduleName: '@env',
					path: '.env',
					safe: false,
					allowUndefined: true,
					verbose: false,
				},
			],
			[
				'module-resolver',
				{
					extensions: ['.ts', '.tsx', '.js', '.jsx', '.ios.js', '.android.js'],
					alias: {
						'@app': './app',
						'@assets': './assets',
						'@components': './components',
						'@config': './config',
						'@constants': './constants',
						'@models': './models',
						'@services': './services',
						'@types': './types',
						'@stores': './stores',
						'@features': './features',
						'@utils': './utils',
					},
				},
			],
		],
	};
};
