const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema

const AboutSchema= new Schema({
    about_title:{
        type:String,
        required:true,
    },
    
});
const AboutModel= new mongoose.model('about',AboutSchema)
 module.exports = AboutModel