const {AuthController} = require("../http/controllers/auth.controller");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");
const { RigesterValidator } = require("../http/validations/auth");
const router = require("express").Router();

router.post("/register" , RigesterValidator() ,ExpressValidatorMapper ,AuthController.Register)
module.exports = {
    AuthRoutes : router
}