const { UserModel } = require("../../models/user");
const { HashString, TokenGenerator } = require("../../modules/functions");
const bcrypt = require("bcrypt")

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
    async Login(req , res ,next){
        try {
            const {username , password} = req.body
            const user = await UserModel.findOne({username})
            if(!user) throw {status : 401 , message : "Username or password is not correct"}
            const compareResult = bcrypt.compareSync(password , user.password)
            if(!compareResult) throw {status : 401 , message : "Username or password is not correct"}
            const token = TokenGenerator({username})
            user.token = token
            await user.save()
            return res.status(200).json({
                status : 200,
                success : true ,
                message : "You have successfully logged into your account",
                token 
            })
        } catch (error) {
            next(error)
        }

    }
    ResetPassword(){

    }
}

module.exports = {
    AuthController : new AuthController
}