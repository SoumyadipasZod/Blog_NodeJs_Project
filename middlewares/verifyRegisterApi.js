// requiring model
const userModel =require('../models/UserModel');

exports.verifyRegister=(req,res,next)=>{
    userModel.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message:'cannot find the user'
            })
        }
        if(user){
            console.log('Username already exists');
            return res.status(401).json({
                message:'username already exists'
            })
        }
        userModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    message:'error finding email'
                })
            }
            if(email){
                // req.flash('message','Email already exists');
                console.log(('Email already exists'));
                return res.status(400).json({
                    message:'email already exists'
                })
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password !== confirm){
                // req.flash('message','Password Mismatch');
                console.log('Password mismatch');
                return res.status(400).json({
                    message:'Password doesnot match'
                })
            }
            next();
        })
    })
}