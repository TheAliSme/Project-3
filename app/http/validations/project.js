const { body } = require("express-validator")

function CreateObjectValidator(){
    return [
        body("title").notEmpty().withMessage("The title of the project cannot be empty"),
        body("text").notEmpty().isLength({min : 20}).withMessage("Project description canot be empty and must be at least 20 words")
        
    ]
}
module.exports = {
    CreateObjectValidator
}