const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    },
    role:{
        type:String,
        default:'user'
    }
})

const UserModel=mongoose.model('user',UserSchema);

module.exports=UserModel;