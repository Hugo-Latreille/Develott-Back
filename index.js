require("dotenv").config();

if (typeof PhusionPassenger !== "undefined") {
	PhusionPassenger.configure({ autoInstall: false });
}

const express = require("express");
const app = express();
const router = require("./app/router/index");
const cors = require("cors");
const corsOptions = require("./app/service/corsOptions");
const MainError = require("./app/error/customError");

//passeport.js
const session = require("express-session");
const passportSetup = require("./app/service/passport");
const passport = require("passport");

//documentation API
const expressJsDocSwagger = require("express-jsdoc-swagger");
const { options } = require("./app/service/optionDocSwagger");

//nettoyer le body

//receptionner le cookies
const cookieParser = require("cookie-parser");
const bodySanitizer = require("./app/service/sanitize");
app.enable("trust proxy");

//variable d'environnement
expressJsDocSwagger(app)(options);

app.use(bodySanitizer);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//Passport.js
app.use(
	session({
		secret: "somethingsecretgoeshere",
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			proxy: true,
			maxAge: 360000,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.use((req, res) => {
	throw new MainError("Page non trouvée", req, res, 404);
});

//!TEST NEON
// // app.js
// const postgres = require("postgres");

// const URL =
// 	"postgres://develott:OukF0DrRC7zU@ep-black-cloud-602350.eu-central-1.aws.neon.tech/develott?options=project%3Dep-black-cloud-602350";

// const sql = postgres(URL, { ssl: "require" });

// async function getPgVersion() {
// 	const result = await sql`select version()`;
// 	console.log(result);
// }
// getPgVersion();
//!TEST NEON

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
// 	console.log(`Server running on http://localhost:${PORT}`);
// });

//? Config fly.io:
// const PORT = 5000;

// app.listen(PORT, "0.0.0.0");

//? config o2switch :
if (typeof PhusionPassenger !== "undefined") {
	app.listen("passenger");
} else {
	app.listen(3002);
}

// app.listen(SERVER_PORT, () => {console.log(`Server running on http://localhost:${SERVER_PORT}/api-docs`)});
