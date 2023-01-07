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
module.exports = {
    HashString,
    TokenGenerator
}