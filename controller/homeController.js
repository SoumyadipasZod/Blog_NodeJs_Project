
const path=require('path')
const express=require('express')
const bodyParser = require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({ extended: true }))

//define model for databas table or collection
const postModel=require('../models/PostModel');











exports.home=(req,res)=>{
    const pager =req.query.page ? req.query.page : 1
    const options ={
        page: pager,
        limit:3,
        collation:{
            locale: 'en'
        },
    };
    postModel.paginate({},options).then((data) =>{
        if(data){
            res.render('home',{
                title:'Home-page',
                data:data,
                // data:req.user,
                postdata:req.post,
                pager:pager,
                message:req.flash('message'),
                alert:req.flash('alert')
            })
        }
    }).catch(err =>{
        console.log(err);
    })
}