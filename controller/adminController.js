const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// require model
// here we are requiring the user model for single table
const Model =require('../models/UserModel');
// login page
exports.login =(req,res) =>{
    res.render('admin/adminlogin',{
        title:'Admin login',
        data:req.admin
    })
}

// addlogin
exports.addlogin=(req,res,next)=>{
    Model.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status && data.role==='admin'){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        username:data.username,
                        email:data.email,
                        role:data.role
                    },'soumyadip@21031998',{expiresIn:'5m'})
                    res.cookie('adminToken',token);
                    // console.log(data);
                    res.redirect('admin-dashboard');
                }else{
                    req.flash('message','Invalid Password');
                    req.alert('alert','alert-danger');
                    console.log('invalid password');
                    res.redirect('/admin');
                }
            }else{
                req.flash('message','Account is not verified')
                req.alert('alert','alert-danger');
                console.log('account not verified');
                res.redirect('/admin');
            }
        }else{
            req.flash('message','Invalid email');
            req.alert('alert','alert-danger');
            console.log('invalid email');
            res.redirect('/admin');
        }
    })
}

// dashboard
exports.dashboard = (req,res) =>{
    res.render('admin/adminDashboard',{
        title:'Admin Dashboard',
        data:req.admin
    })
}
exports.adminAuth = (req,res,next) =>{
    if(req.admin){
        console.log(req.admin);
        next();
    }else{
        console.log(req.admin);
        res.redirect('/admin');
    }
}


// logout
exports.logout = (req,res) =>{
    res.clearCookie('adminToken');
    req.flash('message','Invalid email');
    req.alert('alert','alert-danger');
    res.redirect('/admin');
}