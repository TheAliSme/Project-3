class UserController {
    GetProfile(req , res , next){
        try {
            const user = req.user
            return res.status(200).json({
                status : 200,
                success : true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    EditProfile(){
        try {
            
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