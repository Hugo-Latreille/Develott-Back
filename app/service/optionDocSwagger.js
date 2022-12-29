const options = {
	info: {
		version: "1.0.0",
		title: "API develott",
		description: `Voici toutes vos routes aux petis oignons`,
		license: {
			name: "MIT",
		},
	},
	paths: {},
	security: {
		BasicAuth: {
			type: "http",
			scheme: "basic",
		},
	},
	swaggerUIPath: "/api-docs",
	baseDir: __dirname,
	filesPattern: "../**/*.js",
	servers: [
		{
			url: "http://localhost:3002/api-docs/",
			description: "Development server develott",
		},
	],
};

module.exports = { options };
