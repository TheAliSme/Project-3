const { UserModel } = require("../../models/user");
const { CreateLinkForFiles } = require("../../modules/functions");

class UserController {
    GetProfile(req , res , next){
        try {
            const user = req.user;
            user.profile_image = CreateLinkForFiles(user.profile_image,req);
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
    async GetAllRequest(req,res,next){
        try {
            const userID = req.user._id
            const inviteRequest = await UserModel.aggregate([
                {
                    $project : {
                        inviteRequest : 1
                    }
                },{
                    $match : {
                        _id : userID
                    }
                },{
                    $lookup : {
                        from : "users",
                        localField : "inviteRequest.caller",
                        foreignField : "username",
                        as : "inviteRequest.callerInfo"
                    }
                }
            ])
            return res.json({
                request : inviteRequest
            })
        } catch (error) {
            next(error)
        }
    }
    async GetRequestByStatus(req,res,next){
        try {
            const {status} = req.params;
            const userID = req.user._id
            const request = await UserModel.aggregate([
                 {
                    $match : {_id : userID}
                 },
                 {
                    $project : {
                        inviteRequest : 1,
                        _id : 0,
                        inviteRequest : {
                            $filter : {
                                input : "$inviteRequest",
                                as : "request",
                                cond : {
                                    $eq : ["$$request.status",status]
                                }
                            }
                        }
                    }
                 }
            ])
            return res.status(200).json({
                status : 200,
                success : true,
                request : request?.[0]?.inviteRequest || []
            })
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
    async GetListOfUser(req,res,next){
        try {
            const user  = await UserModel.find({})
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async ChangeStatusRequest(req,res,next){
        try {
            const {id,status} = req.params
            const request = await UserModel.findOne({"inviteRequest._id" : id})
            if(!request) throw {status : 404,message : "no request was found whit this specification"}
            const findRequest = request.inviteRequest.find(item => item.id == id)
            if(findRequest.status !== "pending") throw {status : 400,message : "this request has already been accepted or rejected"}
            if(!["accepted","rejected"].includes(status)) throw{status : 400,message : "the information entered is incorrect"}
            const updateResult = await UserModel.updateOne({"inviteRequest._id" : id},{
                $set : {"inviteRequest.$.status" : status}
            })
            if(updateResult.modifiedCount == 0) throw {status : 500,message : "request status change was not successful"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "request status change successfully"
            })
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