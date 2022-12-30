const corsOptions = {
	origin: [
		// "http://localhost:3000",
		// "https://develott-front.herokuapp.com",
		"https://develott.fr",
		"http://develott.fr",
		"https://www.develott.fr",
		"http://www.develott.fr",
	],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 200,
	credentials: true,
};

module.exports = corsOptions;
