const passport = require("passport");
const express = require("express");
const gitRouter = express.Router();
const { foundByGithubUsername } = require("../datamapper/userDatamapper");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../service/jsonwebToken");

//module

//ROUTER API
// const CLIENT_URL = "https://develott-front.herokuapp.com/";
const CLIENT_URL = "http://localhost:3000";

/*******************
 **       GET      **
 *******************/

gitRouter.get(
	/**
	 * GET /v1/auth/github
	 * @summary Authentification avec github
	 * @description Authentification avec github
	 * @tags Git
	 * @param {number} request.id.required
	 *
	 * @returns {string} 200 - Description
	 * @example response - 200 - success response - application/json
	 *
	 * @example response - 400 - Intitulé 01
	 * {"Error 400": "Demande erroné"}
	 * @return {string} 400 - Description Global
	 *
	 * @example response - 500 - Intitulé 01
	 * {"Error 500": "le serveur a du mal à répondre"}
	 * @return {string} 500 - Description Global
	 */
	"/auth/github",
	passport.authenticate("github", { scope: ["profile"] })
);

gitRouter.get(
	/**
	 * GET /v1/auth/github/callback
	 * @summary callback de l'authentification avec github
	 * @description callback de l'authentification avec github
	 * @tags Git
	 * @param {number} request.id.required
	 *
	 * @returns {string} 200 - Description
	 * @example response - 200 - success response - application/json
	 *
	 * @example response - 400 - Intitulé 01
	 * {"Error 400": "Demande erroné"}
	 * @return {string} 400 - Description Global
	 *
	 * @example response - 500 - Intitulé 01
	 * {"Error 500": "le serveur a du mal à répondre"}
	 * @return {string} 500 - Description Global
	 */
	"/auth/github/callback",
	passport.authenticate("github", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

gitRouter.get(
	/**
	 * GET /v1/login/success
	 * @summary Connexion avec github succes
	 * @description Connexion avec github succes
	 * @tags Git
	 * @param {number} request.id.required
	 *
	 * @returns {string} 200 - Description
	 * @example response - 200 - success response - application/json
	 *
	 * @example response - 400 - Intitulé 01
	 * {"Error 400": "Demande erroné"}
	 * @return {string} 400 - Description Global
	 *
	 * @example response - 500 - Intitulé 01
	 * {"Error 500": "le serveur a du mal à répondre"}
	 * @return {string} 500 - Description Global
	 */
	"/login/success",
	async (req, res) => {
		if (req.session.passport) {
			const githubUsername = req.session.passport.user.username;
			const foundUser = await foundByGithubUsername(githubUsername);
			const accessToken = generateAccessToken(foundUser.email);
			const refreshToken = generateRefreshToken(foundUser.email);
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.status(200).json({
				success: true,
				message: "successful",
				githubUser: req.session.passport.user,
				foundUser: foundUser,
				accessToken: accessToken,
			});
		} else {
			res.status(403).json({ message: "no user" });
		}
	}
);

gitRouter.get(
	/**
	 * GET /v1/login/failed
	 * @summary Fail pour la connexion avec github
	 * @description Fail pour la connexion avec github
	 * @tags Git
	 * @param {number} request.id.required
	 *
	 * @returns {string} 200 - Description
	 * @example response - 200 - success response - application/json
	 *
	 * @example response - 400 - Intitulé 01
	 * {"Error 400": "Demande erroné"}
	 * @return {string} 400 - Description Global
	 *
	 * @example response - 500 - Intitulé 01
	 * {"Error 500": "le serveur a du mal à répondre"}
	 * @return {string} 500 - Description Global
	 */
	"/login/failed",
	(_, res) => {
		res.status(401).json({
			success: false,
			message: "failure",
		});
	}
);

module.exports = gitRouter;
