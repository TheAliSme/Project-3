const { CheckLogin } = require("../http/middlewares/autoLogin");
const {UserController} = require("../http/controllers/user.controller");
const { upload_multer } = require("../modules/multer");
const { ImageValidator } = require("../http/validations/user");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");

const router = require("express").Router();
router.get("/profile",CheckLogin, UserController.GetProfile)
router.get("/list",CheckLogin, UserController.GetListOfUser)
router.post("/profile",CheckLogin, UserController.EditProfile)
router.post("/profile-image",
    upload_multer.single("image"),
    ImageValidator(),
    ExpressValidatorMapper ,
    CheckLogin,
    UserController.UploadProfileImage)
router.get("/requests",CheckLogin,UserController.GetAllRequest)
router.get("/requests/:status",CheckLogin,UserController.GetRequestByStatus)
router.get("/change-status-request/:id/:status",CheckLogin,UserController.ChangeStatusRequest)
module.exports = {
    UserRoutes : router
}