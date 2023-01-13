const { body } = require("express-validator");
const path = require("path")
function ImageValidator(){
    return [
        body("image").custom((value,{req}) => {
            if(Object.keys(req.file).length == 0) throw "Please inter an image"
            const ext = path.extname(req.file.originalname)
            const exts = [".jpeg" , ".png" , ".jpg" , ".gif" , ".webp"]
            if(!exts.includes(ext)) throw "the entered format is not correct"
            const MaxSize = 2 * 1024*1024;
            if(req.file.size  > MaxSize) throw "the size of the file exceeds the limit"
            return true
        })
    ]
}
module.exports = {
    ImageValidator
}