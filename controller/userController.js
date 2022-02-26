// require model

const bcrypt = require("bcryptjs");
const path=require('path');
const jwt=require('jsonwebtoken');
const userModel = require('../models/UserModel');
const postModel = require('../models/PostModel');

// login
exports.login =(req,res) =>{
    res.render('login',{
        title: 'Login',
        data:req.user,
        message:req.flash('message'),
        alert:req.flash('alert')
    })
}

exports.addLogin=(req,res,next)=>{
    userModel.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status && data.role==='user'){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        username:data.username,
                        email:data.email,
                        role:data.role
                    },'soumyadip@21031998',{expiresIn:'5m'})
                    res.cookie('userToken',token);
                    // console.log(data);
                    res.redirect('/');
                }else{
                    req.flash('message','Invalid Password');
                    req.flash('alert','alert-danger')
                    console.log('Invalid Password');
                    res.redirect('/login');
                }
            }else{
                req.flash('message','Account is not verified');
                req.flash('alert','alert-danger')
                console.log('Account is not verified');
                res.redirect('/login');
            }
        }else{
            req.flash('message','Invalid email');
            req.flash('alert','alert-danger');
            console.log('Invalid email');
            res.redirect('/login');
        }
    })
}

// register
exports.register =(req,res) =>{
    res.render('register',{
        title: 'Register',
        data:req.user,
        message:req.flash('message'),
        alert:req.flash('alert')
    })
}

// add register
exports.addRegister=(req,res)=>{
    userModel({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save().then(result=>{
        console.log('You have registered successfully. Login now.');
        req.flash('message','You have registered successfully. Login now.');
        req.flash('alert','alert-success');
        res.redirect('/login');
        console.log('User Added...');
    }).catch(err=>{
        console.log(err,'User add failed');
        req.flash('message','User add failed');
        req.flash('alert','alert-danger');
        res.redirect('/register');
    })
}

// dashboard
// exports.dashboard=(req,res)=>{
//     postModel.find({limit:5},(err,data)=>{
//         if(!err){
//             res.render('dashboard',{
//                 title:'Dashboard',
//                 data:req.user,
//                 postdata:req.post,
//                 viewdata:data
//             })
//         }
//     })
    
// }

// exports.dashboard=(req,res)=>{
//     const pager =req.query.page ? req.query.page : 1
//     const options ={
//         page: pager,
//         limit:3,
//         collation:{
//             locale: 'en'
//         },
//     };
//     postModel.paginate({},options).then((data) =>{
//         if(data){
//             res.render('dashboard',{
//                 title:'Dashboard',
//                 data:data,
//                 postdata:req.post,
//                 pager:pager,
//                 message:req.flash('message'),
//                 alert:req.flash('alert')
//             })
//         }
//     }).catch(err =>{
//         console.log(err);
//     })
// }


// for authentication the dashboard
exports.userAuth=(req,res,next)=>{
    if( req.user){
        console.log( req.user);
        next();
    }else{
        console.log( req.user,'err');
        res.redirect('/login')
    }
}



// logout
exports.logout = (req, res) => {
    res.clearCookie('userToken');
    // req.flash('message','Logged Out Successfully');
    
    res.redirect('/login');
    
}