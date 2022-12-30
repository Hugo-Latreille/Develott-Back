const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { foundByGithubUsername } = require("../datamapper/userDatamapper");

passport.use(
	new GithubStrategy(
		{
			clientID: "882ad3a13b9b52cd68f6",
			clientSecret: "185247a333093dad2aeb7ff26b005cb4d61132ee",
			// callbackURL: "https://develott.herokuapp.com/v1/auth/github/callback",
			// callbackURL: "http://localhost:3001/v1/auth/github/callback",
			callbackURL: "https://api.develott.fr/v1/auth/github/callback",
			// callbackURL: "https://develottapi.fly.dev/v1/auth/github/callback",
		},
		async function (accessToken, refreshToken, profile, done) {
			// console.log(profile)
			const User = await foundByGithubUsername(profile._json.login);
			if (!User) {
				return done(null, false);
			}

			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
