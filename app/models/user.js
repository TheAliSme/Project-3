const mongoose = require("mongoose")

const InviteRequest = new mongoose.Schema({
    teamID : {type : mongoose.Types.ObjectId,required : true},
    caller : {type : String,required : true,lowercase : true},
    requestDate : {type : Date,default : new Date()},
    status : {type : String,default : "pending"}
})
const UserSchema = new mongoose.Schema({
    first_name : {type : String} ,
    last_name : {type : String} ,
    username : {type : String , required : true , unique : true ,lowercase : true} ,
    password : {type : String, required : true} ,
    mobile : {type : String, required : true, unique : true} ,
    roles : {type : [String], default : ["USER"]} ,
    email : {type : String, required : true, unique : true,lowercase : true} ,
    skils : {type : [String], default : []} ,
    teams : {type : [mongoose.Types.ObjectId], default : []} ,
    token : {type : String ,default : ""},
    profile_image : {type : String,required : false} ,
    inviteRequest : {type : [InviteRequest]}
},{
    timestamps : true
})
const UserModel = mongoose.model("user" , UserSchema)
module.exports = {
    UserModel
}