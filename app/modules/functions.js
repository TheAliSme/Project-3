const bcrypt = require("bcrypt")

function HashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str , salt)
}
module.exports = {
    HashString
}