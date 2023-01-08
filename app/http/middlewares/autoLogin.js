const UserModel = require("moongose/models/user_model");
const { VerifyJwtToken } = require("../../modules/functions");

const CheckLogin = async (req , res, next) => {
    try {
        const authorization =req?.headers?.authorization;
        if(!authorization) throw {status : 401 , message : "please login to your accunt"}
        let token = authorization.split(" ")?.[1];
        if(!token) throw {status : 401 , message : "please login to your accunt"}
        const result = VerifyJwtToken(token)
        const {username} = result
        const user = await UserModel.findOne({username},{password : 0})
        if(!user) throw {status : 401 , message : "please login to your accunt"}
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = {
    CheckLogin
}