// const { date } = require('joi');
const searchDatamapper = require("../datamapper/searchDatamapper");
const MainError = require("../error/customError");

const searchController = {
	async searchFilter(req, res) {
		try {
			const body = req.body;
			const result = await searchDatamapper.searchFilter(body);
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchAllProjectByAsc(req, res) {
		try {
			const result = await searchDatamapper.projectsByAsc();
			if (!result) {
				throw new MainError("can't get all project", req, res, 404);
			}
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchAllProjectByDesc(req, res) {
		try {
			const result = await searchDatamapper.projectsByDesc();
			if (!result) {
				throw new MainError("can't get all project", req, res, 404);
			}
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},

	async fetchAllProjectBetweenDate(req, res) {
		try {
			const endDate = req.body.endDate;
			const result = await searchDatamapper.projectsByDesc(endDate);
			return res.status(200).json(result);
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = searchController;
