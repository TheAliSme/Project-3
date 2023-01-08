const { CheckLogin } = require("../http/middlewares/autoLogin");
const {UserController} = require("../http/controllers/user.controller");

const router = require("express").Router();
router.get("/profile",CheckLogin, UserController.GetProfile)
module.exports = {
    UserRoutes : router
}