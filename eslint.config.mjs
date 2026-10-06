import globals from 'globals';

export default [
	{ ignores: ['node_modules/**', 'dist/**', '.claude/**'] },
	{
		files: ['site/assets/js/**/*.js'],
		languageOptions: { ecmaVersion: 2018, sourceType: 'script', globals: globals.browser },
	},
	{
		files: ['api/**/*.js', 'tools/**/*.mjs', 'vite.config.js'],
		languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
	},
];
