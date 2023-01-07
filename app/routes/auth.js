const {AuthController} = require("../http/controllers/auth.controller");
const { ExpressValidatorMapper } = require("../http/middlewares/checkerrors");
const { RigesterValidator, LoginValidation } = require("../http/validations/auth");
const router = require("express").Router();

router.post("/register" , RigesterValidator() ,ExpressValidatorMapper ,AuthController.Register)
router.post("/login" ,LoginValidation() , ExpressValidatorMapper ,AuthController.Login)
module.exports = {
    AuthRoutes : router
}