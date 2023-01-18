const corsOptions = {
	origin: [
		"http://localhost:3000",
		"https://develott.fr",
		"https://www.develott.fr",
	],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200,
	credentials: true,
};

module.exports = corsOptions;
