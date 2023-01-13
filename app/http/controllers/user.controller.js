const { UserModel } = require("../../models/user");
const path = require("path")

class UserController {
    GetProfile(req , res , next){
        try {
            const user = req.user
            user.profile_image = req.protocol + "://" + req.get("host") + "/" + user.profile_image
            console.log(user.profile_image)
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async EditProfile(req,res,next){
        try {
            let data = {...req.body};
            const UserId =req.user._id
            let fields = ["first_name","last_name","skils"]
            let badValues = [""," ",0,NaN,null,undefined,-1,[],{}]
            Object.entries(data).forEach(([key,value])=>{
                if(!fields.includes(key)) delete data[key]
                if(badValues.includes(value)) delete data[key]
            })
            const result = await UserModel.updateOne({_id : UserId},{$set : data})
            if(result.modifiedCount > 0) throw{
                status : 200,
                success : true,
                message : "The update as completed successfully"
            }
        } catch (error) {
            next(error)
        }
    }
    async UploadProfileImage(req,res,next){
        try {
            const UserId = req.user._id
            const FilePath = req.file?.path?.substring(7);
            const result = await UserModel.updateOne({_id : UserId},{$set : {profile_image : FilePath}})
            if(result.modifiedCount == 0) throw {status : 400, message : "Update failed"}
            return res.status(200).json({
                status : 200 ,
                success : true , 
                message : "Update successfully"})

        } catch (error) {
            next(error)
        }
    }
    AddSkils(){
        try {
            
        } catch (error) {
            next(error)
        }        
    }
    EditSkils(){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    AcceptInviteInTeam(){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    RejectInviteInTeam(){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    UserController : new UserController
}