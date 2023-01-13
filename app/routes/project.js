const {ProjectController} = require("../http/controllers/project.controller");
const { CheckLogin } = require("../http/middlewares/autoLogin");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");
const { CreateObjectValidator } = require("../http/validations/project");
const { uploadfile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");
const router = require("express").Router();

router.post("/create" ,fileupload() ,uploadfile, CheckLogin,CreateObjectValidator(),ExpressValidatorMapper ,ProjectController.CreateProject)

module.exports = {
    ProjectRoutes : router
}