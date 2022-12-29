const express = require("express");
const router = express.Router();

//todo middleware gestion de la 404 implementer ici

// swagger endpoint => https://develott.herokuapp.com/api-docs/

//variable de nos modules
const userRouter = require("./routerUser");
const projectRouter = require("./routerProject");
const jobRouter = require("./routerJob");
const technoRouter = require("./routerTechno");
const gitRouter = require("./routerAuthGit");
const roleRouter = require("./routerRole");
const searchRouter = require("./routerSearch");

// gestion de l'api
router.use("/v1", userRouter);
router.use("/v1", projectRouter);
router.use("/v1", gitRouter);
router.use("/v1", jobRouter);
router.use("/v1", technoRouter);
router.use("/v1", roleRouter);
router.use("/v1", searchRouter);

module.exports = router;
