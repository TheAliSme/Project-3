const { ProjectModel } = require("../../models/project")

class ProjectController {
    async CreateProject(req , res ,next){
        try {
            const {title , text , image} = req.body
            const owner = req.user._id
            const result = await ProjectModel.create({title , text, owner , image})
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
    GetAllProject(){

    }
    GetProjectById(){
        
    }
    GetAllProjectOfTeam(){

    }
    GetProjectOfUser(){

    }
    UpdateProject(){

    }
    RemoveProject(){

    }
}
module.exports = {
    ProjectController : new ProjectController()
}