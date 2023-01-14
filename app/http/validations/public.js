const { param } = require("express-validator");

function MongoIdValidator(){
    return [
        param("id").isMongoId().withMessage("The entered ID is not correct")
    ]
}
module.exports ={
    MongoIdValidator
}