const fileupload = require("express-fileupload");
const path = require("path");
const { CreateUploadPath } = require("./functions");

const uploadfile = async (req ,res ,next) => {
    try {
        fileupload();
        if(req.file || Object.keys(req.files).length == 0) throw {status : 400 , message : "Enter the project image"}
        let image = req.files.image
        const image_path = path.join(CreateUploadPath() ,(Date.now() + path.extname(image.name)))
        req.body.image = image_path
        let uploadPath = path.join(__dirname , ".." ,"..",image_path) 
        image.mv(uploadPath , (err) => {
            if(err) throw {status : 500 , message : "The image could not be loaded"}
            next()
        })
    } catch (error) {
        next(error)
    }

}
module.exports = {
    uploadfile
}