const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

function RigesterValidator(){
    return [
        body("username").custom(async(value , ctx) => {
            if(value){
                const UsernameReges = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if(UsernameReges.test(value)){
                    const user =await UserModel.findOne({username : value})
                    if(user) throw "The username is already registered in the system"
                    return true
                }
                throw "Username is not correct"
            }
            throw "Username cannot be empty"
        }),
        body("email").isEmail().withMessage("the entered email is not correct").custom(async email => {
            const user =await UserModel.findOne({email})
            if(user) throw "The entered email address is already in use"
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("The mobile number entered is not correct").custom(async mobile => {
            const user =await UserModel.findOne({mobile})
            if(user) throw "The entered mobile phone is already in use"
            return true
        }),
        body("password").isLength({min : 6 , max : 24}).withMessage("the password must be at least 6 and at must 24 characters")
        .custom((value , ctx) => {
            if(!value) throw "password cannoot be empty"
            if(value !== ctx?.req?.body?.confirm_password) throw "the password is not the same as repeating it"
            return true
        })
    ] 
}
function LoginValidation(){
    return [
        body("username").notEmpty().withMessage("Username cannot be empty").custom(async username => {
            const UsernameReges = /^[a-z]+[a-z0-9\_\.]{2,}/gi
            if(UsernameReges.test(username)){
                return true
            }
            throw "Username is not correct"
        }),
        body("password").isLength({min : 6 , max : 24}).withMessage("the password must be at least 6 and at must 24 characters")
    ]
}
module.exports = {
    RigesterValidator,
    LoginValidation
}