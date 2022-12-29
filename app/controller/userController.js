const userDatamapper = require("../datamapper/userDatamapper");
const bcrypt = require("bcrypt");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../service/jsonwebToken");
const crypto = require("crypto");
const postMail = require("../service/nodemailerService.js");
const resetPasswordMail = require("../service/nodemailerPasswordService.js");
const MainError = require("../error/customError");

const userController = {
	/**
	 * creer un utilisateur
	 * @param {string} data
	 */

	async create(req, res) {
		try {
			const data = req.body;
			const email = data.email;
			let checkUserExist = await userDatamapper.checkUserExist(email);
			if (checkUserExist && checkUserExist.email === email) {
				throw new MainError("This email already use", req, res, 409);
			}
			const verificationLink = crypto.randomBytes(32).toString("hex");
			if (!verificationLink) {
				throw new MainError("Link does not exists", req, res, 400);
			}
			//TODO créer l'utilisateur en bdd + la verificationLink
			const result = await userDatamapper.createUser(data, verificationLink);
			if (!result) {
				throw new MainError("Lien invalide", req, res, 400);
			}
			const user = await userDatamapper.foundUserBymail(data.email);
			if (!user) {
				throw new MainError("This user does not exists", req, res, 400);
			}
			// const message = `https://develott.herokuapp.com/v1/user/verify/${user.id}/${verificationLink}`;
			const message = `http://localhost:3002/v1/user/verify/${user.id}/${verificationLink}`;
			await postMail(data.email, message);
			res.status(201).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async checkVerificationLink(req, res) {
		try {
			const data = req.params;
			const userId = req.params.id;
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const userVerificationLink = data.verificationLink;
			if (!userVerificationLink) {
				throw new MainError("Invalid link", req, res, 400);
			}
			//TODO check dans base si l'email (userId) existe ET le lien de vérification
			//si utilisateur n'existe pas : res.status(400).send("Lien invalide")
			const result = await userDatamapper.verificationLink(
				userId,
				userVerificationLink
			);
			//TODO update l'utilisateur : on supprime le verificationLink + on passe Verified à true
			const valideleted = await userDatamapper.deleteLinkEmail(userId);
			const updated = await userDatamapper.updatesStatus(userId);
			res
				.status(200)
				// .redirect("https://develott-front.herokuapp.com/connexion/");
				.redirect("http://localhost:3000/connexion/");
		} catch (error) {
			console.error(error);
		}
	},

	async createResetPasswordLink(req, res) {
		try {
			const email = req.body.email;
			if (!email) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const verificationLink = crypto.randomBytes(32).toString("hex");
			if (!verificationLink) {
				throw new MainError("Invalid link", req, res, 400);
			}
			const user = await userDatamapper.foundUserBymail(email);
			if (!user) {
				throw new MainError("This user does not exists", req, res, 400);
			}
			const updateLink = await userDatamapper.updatesValidationLink(
				verificationLink,
				user.id
			);
			if (!updateLink) {
				throw new MainError("Link not uptdate", req, res, 400);
			}
			// const message = `https://develott.herokuapp.com/v1/user/verifyPassword/${user.id}/${verificationLink}`;
			const message = `http://localhost:3002/v1/user/verifyPassword/${user.id}/${verificationLink}`;

			const result = await resetPasswordMail(email, message);
			res.status(200).json("ok");
		} catch (error) {
			console.error(error);
		}
	},

	async checkPasswordResetLink(req, res) {
		try {
			const data = req.params;
			const userId = data.id;
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const userVerificationLink = data.verificationLink;
			if (!userVerificationLink) {
				throw new MainError("Lien invalide", req, res, 400);
			}
			//TODO check dans base si l'email (userId) existe ET le lien de vérification
			//si utilisateur n'existe pas : res.status(400).send("Lien invalide")
			const result = await userDatamapper.verificationLink(
				userId,
				userVerificationLink
			);
			if (!result) {
				throw new MainError("Lien invalide", req, res, 404);
			}
			//TODO update l'utilisateur : on supprime le verificationLink + on passe Verified à true
			await userDatamapper.deleteLinkEmail(userId);

			res
				.status(200)
				// .redirect(`https://develott-front.herokuapp.com/newpassword/${userId}`);
				.redirect(`http://localhost:3000/newpassword/${userId}`);
		} catch (error) {
			console.error(error);
		}
	},

	async updatePassword(req, res) {
		try {
			const newPassword = req.body.password;
			const userId = Number(req.body.userId);
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			console.log(req.body);
			const resetPassword = await userDatamapper.updatePassword(
				newPassword,
				userId
			);
			if (!resetPassword) {
				throw new MainError("missing reset", req, res, 404);
			}
			res.sendStatus(200);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchAllUser(_, res) {
		try {
			const result = await userDatamapper.allUser();
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchOneUserById(req, res) {
		try {
			const userId = parseInt(req.params.id, 10);
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const result = await userDatamapper.foundUserById(userId);
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchOneUserBymail(req, res) {
		try {
			const email = req.params.email;
			if (!email) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const result = await userDatamapper.foundUserBymail(email);
			if (!result) {
				throw new MainError("This email does not exists", req, res, 404);
			}
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async deleteUser(req, res) {
		try {
			const userId = parseInt(req.params.id, 10);
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const result = await userDatamapper.destroy(userId);
			return res.status(204).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async updateUser(req, res) {
		try {
			const body = req.body;
			const userId = req.params.id;
			if (!userId) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const result = await userDatamapper.update(body, userId);
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	//la generation de token

	async logIn(req, res) {
		try {
			const email = req.body.email;
			if (!email) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const password = req.body.password;
			if (!password) {
				throw new MainError("missing parameter", req, res, 400);
			}
			const foundUser = await userDatamapper.foundUserBymail(email);
			if (!foundUser) {
				throw new MainError("le mail n'existe pas", req, res, 400);
			}

			const passwordValidate = await bcrypt.compare(
				password,
				foundUser.password
			);

			if (!passwordValidate) {
				throw new MainError("Wrong password", req, res, 404);
			}

			//*création du JWT
			const accessToken = generateAccessToken(foundUser.email);
			//* création du refreshToken
			const refreshToken = generateRefreshToken(foundUser.email);

			//? Est-ce qu'on stocke le refreshToken en bdd ?

			// res.cookie("jwt", refreshToken, {
			// 	httpOnly: true,
			// 	maxAge: 24 * 60 * 60 * 1000,
			// });
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				sameSite: "None",
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			});
			res.status(200).json({ accessToken, foundUser });
		} catch (error) {
			console.error(error);
		}
	},

	async postTechnoByCustomer(req, res) {
		try {
			const body = req.body;
			const result = await userDatamapper.pickTechnoHasCustomer(body);
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},
};
module.exports = userController;
