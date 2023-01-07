const { UserModel } = require("../../models/user");
const { HashString } = require("../../modules/functions");

class AuthController {
    async Register(req , res ,next){
        try {
            const {username , password , email , mobile} = req.body;
            const hash_pssword = HashString(password)
            const user = await UserModel.create({username , password : hash_pssword , email , mobile})
            .catch(err =>{
                if(err?.code == 11000){
                    throw {status : 400 , message : "The username is already registered in the system"}
                }
            })
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
    Login(){

    }
    ResetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController
}