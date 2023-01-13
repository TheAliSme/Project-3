const { body } = require("express-validator")

function CreateObjectValidator(){
    return [
        body("title").notEmpty().withMessage("The title of the project cannot be empty"),
        body("tags").isArray({min : 0 , max : 10}).withMessage("The maximum use of hashtags is 10"),
        body("text").notEmpty().isLength({min : 20}).withMessage("Project description canot be empty and must be at least 20 words")
        
    ]
}
module.exports = {
    CreateObjectValidator
}