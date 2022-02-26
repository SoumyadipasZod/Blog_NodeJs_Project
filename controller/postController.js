const path=require('path');
const express=require('express');

const postModel=require('../models/PostModel');
const userModel=require('../models/UserModel');

// visiting post page
exports.post =(req,res) =>{
    res.render('post',{
        title: 'post',
        data:req.user,
        postdata:req.post
    })
}
// login auth check
exports.loginAuthCheck = (req,res,next) => {
    //console.log(req.cookies)
    if(req.cookies && req.cookies.userToken){
        next();
    }else{
        res.redirect('/');
    }
}

// viewpost
exports.viewPost=(req,res)=>{
    postModel.findOne({
        slug:req.params.slug
    },(err,data)=>{
        if(!err){
            console.log(data);
            res.render('viewPost',{
                title:'View | Post',
                data:data,
                // data:req.user,
                userdata:req.user

            })
        }
    })
    
}

// auth
exports.postAuth=(req,res,next)=>{
    if(req.cookies && req.cookies.userToken){
        next();
    }else{
        res.redirect('/login');
    }
}

// addpost
exports.addPost=(req,res)=>{
    const image= req.file
    const title=req.body.title.trim()
    const slug=title.replace(/\s+/g,'-').toLowerCase()
    postModel({
        title:req.body.title,
        author:req.body.author,
        subtitle: req.body.subtitle,
        post:req.body.editor1,
        image: image.path,
        slug:slug
    }).save().then((result)=>{
        console.log(result,'Post save successfully');
        req.flash('message','Post save successfully');
        req.flash('alert','alert-success');
        res.redirect('/')
    }).catch((err)=>{
        console.log(err,'Post save failed');
    })
}