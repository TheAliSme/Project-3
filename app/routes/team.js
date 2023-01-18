const { TeamController } = require("../http/controllers/team.controller");
const { CheckLogin } = require("../http/middlewares/autoLogin");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");
const { MongoIdValidator } = require("../http/validations/public");
const { CreateTeamValidator } = require("../http/validations/team");

const router = require("express").Router();

router.post("/create",CheckLogin,CreateTeamValidator(),ExpressValidatorMapper,TeamController.CreateTeam)
router.get("/list",CheckLogin,TeamController.GetListOfTeam)
router.get("/me",CheckLogin,TeamController.GetMyTeams)
router.get("/invite/:teamID/:username",CheckLogin,TeamController.InviteUserToTeam)
router.get("/:id",CheckLogin,MongoIdValidator(),ExpressValidatorMapper,TeamController.GetTeamById)
router.delete("/remove/:id",CheckLogin,MongoIdValidator(),ExpressValidatorMapper,TeamController.RemoveTeamById)

module.exports = {
    TeamRoutes : router
}