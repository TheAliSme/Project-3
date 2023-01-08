const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function HashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str , salt)
}
function TokenGenerator(payload){
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : "365 days"})
    return token
}
function VerifyJwtToken(token){
    const result = jwt.verify(token , process.env.SECRET_KEY);
    if(!result?.username) throw {status : 401 , message : "please login to your accunt"}
    return result;
}
module.exports = {
    HashString,
    TokenGenerator,
    VerifyJwtToken
}