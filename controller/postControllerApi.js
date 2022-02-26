const path =require('path');
const express = require('express');

// require models
const postModel=require('../models/PostModel');
const userModel=require('../models/UserModel');

// visiting post page api
exports.post =(req,res) =>{
    res.status(200).json({
        status: 'success',
        message: 'welcome.Create your Post here'
    });
}

// loginauth check
exports.loginAuthCheck = (req,res,next) => {
    //console.log(req.cookies)
    if(req.cookies && req.cookies.userToken){
        res.status(200).json({
            status: 'success',
            message: 'You are logged in and You can post whatever you want'
        })
    }else{
        res.status(405).json({
            status: 'error',
            message: 'login error'
        });
    }
}

// addpost
exports.addPost=(req,res)=>{
    const image= req.file
    const title=req.body.title.trim()
    const slug=title.replace(/\s+/g,'-').toLowerCase()
    postModel({
        title:req.body.title,
        subtitle: req.body.subtitle,
        post:req.body.editor1,
        image: req.body.image,
        slug:slug
    }).save().then((result)=>{
        res.status(200).json({
            status:'success',
            message:'Post saved successfully'
        })
    }).catch((err)=>{
        res.status(405).json({
            result:err,
            message:'post save failed'
        })
    })
}

// view post
exports.viewPost=(req,res)=>{
    postModel.findOne({
        slug:req.params.slug
    },(err,data)=>{
        if(!err){
            console.log(data);
           res.status(200).json({
               status:'success',
                message: 'view your post'
           })
        }
    })
    
}

// auth
exports.postAuth=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        res.status(200).json({
            status: 'success',
            message: 'You are logged in. You can view posts'
        })
    }else{
        res.status(405).json({
            status: 'error',
            message: 'login error'
        })
    }
}