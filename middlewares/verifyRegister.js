const userModel =require('../models/UserModel');

exports.verifyRegister=(req,res,next)=>{
    userModel.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            console.log(err);
            return;
            // req.flash('message','Error while finding username');
            // console.log(err,'Error while finding username');
            // return res.redirect('/signup');
        }
        if(user){
            req.flash('message','Username already exists');
            req.flash('alert','alert-danger')
            console.log('Username already exists');
            return res.redirect('/register');
        }
        userModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log(err);
                // return;
                req.flash('message','Error while finding email');
                req.flash('alert','alert-danger')
                console.log((err,'Error while finding email'));
                return res.redirect('/register');
            }
            if(email){
                req.flash('message','Email already exists');
                req.flash('alert','alert-danger');
                console.log(('Email already exists'));
                return res.redirect('/register');
            }
            const password=req.body.password;
            const confirm=req.body.confirmPassword;
            if(password !== confirm){
                req.flash('message','Password Mismatch');
                req.flash('alert','alert-danger');
                console.log('Password mismatch');
                return res.redirect('/register');
            }
            next();
        })
    })
}