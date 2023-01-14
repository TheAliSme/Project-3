const autoBind = require("auto-bind")
const { ProjectModel } = require("../../models/project")
const { CreateLinkForFiles } = require("../../modules/functions")

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
            for (const project of projects) {
                project.image = CreateLinkForFiles(project.image,req)
            }
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
            project.image = CreateLinkForFiles(project.image,req)
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
    async UpdateProject(req,res,next){
        try {
            const owner = req.user._id
            const projectId =req.params.id
            const project = await this.FindProject(projectId,owner)
            const data = {...req.body}
            Object.entries(data).forEach(([key,value])=>{
                if(!["title","text","tags"].includes(key)) delete data[key]
                if([""," ",NaN,null,undefined,0].includes(value)) delete data[key]
                if(key == "tags" && (data['tags'].constructor === Array)){
                    data["tags"] = data["tags"].filter(val => {
                        if(![""," ",NaN,null,undefined,0].includes(val)) return val
                    })
                    if(data['tags'].length == 0) delete data['tags']
                }
            })
            const UpdateResult = await ProjectModel.updateOne({_id : projectId},{$set : data})
            if(UpdateResult.modifiedCount == 0) throw {status : 400, message : "Update was not successfully!."}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "Update was successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async UpdateProjectImage(req,res,next){
        try {
            const {image} = req.body
            const owner = req.user._id
            const projectId =req.params.id
            await this.FindProject(projectId,owner)
            const UpdateResult = await ProjectModel.updateOne({_id : projectId},{$set : {image}})
            if(UpdateResult.modifiedCount == 0) throw {status : 400, message : "Update was not successfully!."}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "Update was successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    GetAllProjectOfTeam(){

    }
    GetProjectOfUser(){

    }
}
module.exports = {
    ProjectController : new ProjectController()
}