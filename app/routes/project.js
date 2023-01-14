const {ProjectController} = require("../http/controllers/project.controller");
const { CheckLogin } = require("../http/middlewares/autoLogin");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");
const { CreateObjectValidator } = require("../http/validations/project");
const { uploadfile } = require("../modules/express-fileupload");
const fileupload = require("express-fileupload");
const projectController = require("../http/controllers/project.controller");
const { MongoIdValidator } = require("../http/validations/public");
const router = require("express").Router();

router.post("/create" ,fileupload() ,uploadfile, CheckLogin,CreateObjectValidator(),ExpressValidatorMapper ,ProjectController.CreateProject)
router.get("/list",CheckLogin,ProjectController.GetAllProject)
router.get("/:id",CheckLogin,MongoIdValidator(),ExpressValidatorMapper,ProjectController.GetProjectById)
router.delete("/remove/:id",CheckLogin,MongoIdValidator(),ExpressValidatorMapper,ProjectController.RemoveProject)
router.put("/update/:id",CheckLogin,MongoIdValidator(),ExpressValidatorMapper,ProjectController.UpdateProject)
router.patch("/update-image/:id",fileupload(),CheckLogin,uploadfile,MongoIdValidator(),ExpressValidatorMapper,ProjectController.UpdateProjectImage)
module.exports = {
    ProjectRoutes : router
}