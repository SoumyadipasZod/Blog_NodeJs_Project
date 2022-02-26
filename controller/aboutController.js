const path =require("path");
const AboutModel = require('../models/AboutModel');


exports.about =(req,res) =>{
    AboutModel.find((err,data)=>{
        
        if(!err){
            res.render('about',{
                title: "about page",
                data:data,
                // data:req.user
            })
        }
    })
}