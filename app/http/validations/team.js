const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function CreateTeamValidator(){
    return [
        body("name").isLength({min : 5}).withMessage("the team name cannot be less than 5 characters"),
        body("description").notEmpty().withMessage("the description cannot be empty"),
        body("username").custom(async(username) => {
            const usernameRegep = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if(usernameRegep.test(username)){
                const team = await TeamModel.findOne({username})
                if(team) throw "username is used by another team"
                return true
            }
            throw "the username is not correct"
        })
    ]
}
module.exports = {
    CreateTeamValidator
}