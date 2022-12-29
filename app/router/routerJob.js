const express = require("express");
const jobRouter = express.Router();

//import module
const { authenticateToken } = require("../service/jsonwebToken");
const jobController = require("../controller/jobController");

/*******************
 **      GET      **
 *******************/

jobRouter.get(
	/**
		 * GET /v1/jobs
		 * @summary Avoir tout les jobs
		 * @description Avoir tout les jobs
		 * @tags Job
		 * @return {string} 200 - success response - application/json
 		 * @example response - 200 - success response - application/json
		 * {
			"id": "1",
			"name": "Product Owner"
			}
		 * @return 404 - data not found
		 * @return 500 - Page non trouvée
		 */
	"/jobs",
	jobController.getAllJob
);

/*******************
 **       POST     **
 *******************/
jobRouter.post(
	/**
		 * POST /v1/project/:id(\\d+)/addjob
		 * @summary Ajoute un job à un projet
		 * @description Ajoute un job à un projet
		 * @tags Job
		 * @param {number} request.id.required 
		 * @reqbody
		 * @returns {string} 200 - Description
		 * @example response - 200 - success response - application/json
		 * {
			"projet.id":"1",
            "job.id":"2"
		 * }
		 *@example response - 400 - Intitulé 01
 		 * {"Error 400": "Demande erroné"}
		 * @return {string} 400 - Description Global
		 * 
		 * @example response - 500 - Intitulé 01
	 	 * {"Error 500": "le serveur a du mal à répondre"}
		 * @return {string} 500 - Description Global
		 */
	"/project/:id(\\d+)/addjob",
	authenticateToken,
	jobController.addJobProject
);

/*******************
 **      PATCH     **
 *******************/

jobRouter.patch(
	/**
		 * POST /v1/user/:id(\\d+)/addjob
		 * @summary Ajoute un job à un user
		 * @description Ajoute un job à un user
		 * @tags Job
		 * @param {number} request.id.required 
		 * 
		 * @returns {string} 200 - Description
		 * @example response - 200 - success response - application/json
		 * {
			"customer.id":"1",
            "job.id":"2"
		* }
		 *@example response - 400 - Intitulé 01
 		 * {"Error 400": "Demande erroné"}
		 * @return {string} 400 - Description Global
		 * 
		 * @example response - 500 - Intitulé 01
	 	 * {"Error 500": "le serveur a du mal à répondre"}
		 * @return {string} 500 - Description Global
		 */
	"/user/:id(\\d+)/addjob",
	authenticateToken,
	jobController.addJobUser
);

jobRouter.patch(
	/**
		 * PATCH /v1/user/:id(\\d+)/deletejob
		 * @summary Retire un job à un user
		 * @description Retire un job à un user
		 * @tags Job
		 * @param {number} request.id.required 
		 * 
		 * @returns {string} 200 - Description
		 * @example response - 200 - success response - application/json
		 * {
			"customer.id":"1",
            "job.id":"2"
		* }
		 *@example response - 400 - Intitulé 01
 		 * {"Error 400": "Demande erroné"}
		 * @return {string} 400 - Description Global
		 * 
		 * @example response - 500 - Intitulé 01
	 	 * {"Error 500": "le serveur a du mal à répondre"}
		 * @return {string} 500 - Description Global
		 */
	"/user/:id(\\d+)/deletejob",
	authenticateToken,
	jobController.deleteJobUser
);

/*******************
 **      DELETE    **
 *******************/

jobRouter.delete(
	/**
		 * DELETE /v1/project/:id(\\d+)/deletejob
		 * @summary Retire un job à un projet
		 * @description Retire un job à un projet
		 * @tags Job
		 * @param {number} request.id.required 
		 * 
		 * @returns {string} 200 - Description
		 * @example response - 200 - success response - application/json
		 * {
			"projet.id":"1",
            "job.id":"2"
		* }
		 *@example response - 400 - Intitulé 01
 		 * {"Error 400": "Demande erroné"}
		 * @return {string} 400 - Description Global
		 * 
		 * @example response - 500 - Intitulé 01
	 	 * {"Error 500": "le serveur a du mal à répondre"}
		 * @return {string} 500 - Description Global
		 */
	"/project/:id(\\d+)/deletejob",
	authenticateToken,
	jobController.deleteJobProject
);

module.exports = jobRouter;
