const autoBind = require("auto-bind")
const { ProjectModel } = require("../../models/project")

class ProjectController {
    constructor(){
        autoBind(this)
    }
    async CreateProject(req , res ,next){
        try {
            const {title , text , image ,tags} = req.body
            const owner = req.user._id
            const result = await ProjectModel.create({title , text, owner , image ,tags})
            if(!result) throw {
                status : 400,
                message : "Failed to add project"
            }
            return res.status(201).json({
                status : 201,
                success : true,
                message : "The project was added successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async GetAllProject(req, res , next){
        try {
            const owner = req.user._id
            const projects = await ProjectModel.find({owner})
            return res.status(200).json({
                status : 200,
                success : true,
                projects
            })        
        } catch (error) {
            next(error)
            }
    }
    async FindProject(projectId,owner){
        const project = await ProjectModel.findOne({owner ,_id : projectId})
        if (!project) throw {status : 404 , message : "project is not found!."}
        return project
    }
    async GetProjectById(req,res,next){
        try {
            const owner = req.user._id
            const projectId =req.params.id
            const project = await this.FindProject(projectId,owner)
            return res.status(200).json({
                status : 200,
                success : true,
                project
            })
        } catch (error) {
            next(error)
        }
    }
    async RemoveProject(req,res,next){
        try {
            const owner = req.user._id
            const projectId =req.params.id
            await this.FindProject(projectId,owner)
            const DeletProjectResult = await ProjectModel.deleteOne({_id : projectId})
            if(DeletProjectResult.deletedCount == 0) throw{status : 400 , message : "The project was not deleted"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "The project was deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    GetAllProjectOfTeam(){

    }
    GetProjectOfUser(){

    }
    UpdateProject(){

    }
}
module.exports = {
    ProjectController : new ProjectController()
}