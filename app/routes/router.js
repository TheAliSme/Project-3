const { AuthRoutes } = require("./auth");
const { ProjectRoutes } = require("./project");
const { TeamRoutes } = require("./team");
const { UserRoutes } = require("./user");
const router = require("express").Router();

router.use("/project" , ProjectRoutes)
router.use("/team" , TeamRoutes)
router.use("/user" , UserRoutes)
router.use("/auth" , AuthRoutes)

module.exports = {
    AllRoutes : router
}