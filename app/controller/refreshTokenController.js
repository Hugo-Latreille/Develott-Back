const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../service/jsonwebToken");
const MainError = require("../error/customError");

const handleRefreshToken = (req, res) => {
	try {
		const cookies = req.cookies;
		if (!cookies) {
			throw new MainError("missing parameter", req, res, 400);
		}
		if (!cookies?.jwt) {
			return res.sendStatus(401);
		}
		const refreshToken = cookies.jwt;
		//? ici on retrouve le refresh dans la bdd ?
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) {
				throw new MainError("This is forbiden !", req, res, 403);
			}
			const accessToken = generateAccessToken(user);
			return res.status(200).json({ user: user.user, accessToken });
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = { handleRefreshToken };
