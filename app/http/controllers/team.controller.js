const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");

class TeamController {
    constructor(){
        autoBind(this)
    }
    async CreateTeam(req,res,next){
        try {
            const {description,username,name} = req.body;
            const owner = req.user._id
            const team = await TeamModel.create({
                description,
                username,
                name,
                owner
            })
            if(!team) throw {status : 500 , message : "there was problem creating the team"}
            return res.status(201).json({
                status : 201,
                success : true,
                message : "creating team was successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async GetListOfTeam(req,res,next){
        try {
            const teams = await TeamModel.find({})
            return res.status(200).json({
                status : 200,
                success : true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async GetTeamById(req,res,next){
        try {
            const teamID = req.params.id 
            const team = await TeamModel.findById(teamID)
            if(!team) throw {status : 404,message : "team not found"}
            return res.status(200).json({
                status : 200,
                success : true,
                team
            })
        } catch (error) {
            next(error)
        }
    }
    async GetMyTeams(req,res,next){
        try {
            const userID = req.user._id
            const teams = await TeamModel.find({
                $or : [
                    {owner : userID},
                    {users : userID}
                ]
            })
            return res.status(200).json({
                status : 200,
                success : true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async FindUserInTeam(teamID,userID){
        const result = await TeamModel.findOne({$or : [{owner : userID},{users : userID}],_id : teamID})
        return !!result
    }
    async InviteUserToTeam(req,res,next){
        try {
            const userID = req.user._id
            const {teamID,username} = req.params;
            const team = await this.FindUserInTeam(teamID,userID)
            if(!team) throw {status : 400,message : "no team found to add people to "}
            const user = await UserModel.findOne({username})
            if(!user) throw {status : 400 , message : "the desired user to add to the team could not be found"}
            const userInvited = await this.FindUserInTeam(teamID,user._id)
            if(userInvited) throw {status : 400,message : "the desired user has already been invited to the team"}
            const request = {
                caller : req.user.username,
                requestDate : new Date(),
                teamID,
                status : "pending"
            }
            const updateUserResult = await UserModel.updateOne({username},{$push : {inviteRequest : request}})
            if(updateUserResult.modifiedCount == 0) throw {status : 50,message : "the request was not registered"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "request sent successfully "
            })
        } catch (error) {
            next(error)
        }
    }
    UpdateTeam(){

    }
    async RemoveTeamById(req,res,next){
        try {
            const teamID = req.params.id 
            const team = await TeamModel.findById(teamID)
            if(!team) throw {status : 404,message : "team not found"}
            const result = await TeamModel.deleteOne({_id : teamID})
            if(result.deletedCount == 0) throw{status : 500,message : "team deletion failed.please try again"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "delet was successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    RemoveUserFromTeam(){
        
    }
}
module.exports = {
    TeamController : new TeamController()
}