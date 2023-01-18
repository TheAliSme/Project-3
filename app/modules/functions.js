const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

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
function CreateUploadPath(){
    let d = new Date();
    const year = ""+d.getFullYear()
    const month = ""+d.getMonth()
    const days = ""+d.getDate()
    const UploadPath = path.join(__dirname,"..","..","public","upload",year,month,days);
    fs.mkdirSync(UploadPath,{recursive : true})
    return path.join("public","upload",year,month,days);
}
function CreateLinkForFiles(fileAddress,req){
    return fileAddress? (req.protocol + "://" + req.get("host") + "/" + (fileAddress?.replace((/[\\\\]/gm,"/")))) : undefined ;
}

module.exports = {
    HashString,
    TokenGenerator,
    VerifyJwtToken,
    CreateUploadPath,
    CreateLinkForFiles
}