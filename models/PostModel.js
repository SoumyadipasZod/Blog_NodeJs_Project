const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const mongoosePaginate =require('mongoose-paginate-v2');

const PostSchema= new Schema({
    title:{
        type:String,
        required:[true, 'title is required'],
    },
    author:{
        type:String,
        required:[true, 'author is required'],
    },
    subtitle:{
        type:String,
        required:[true, 'subtitle is required'],
    },
    post:{
        type:String,
        required:[true, 'post is required'],
    },
    image:{
        type:String,
        required:[true, 'image is required'],
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    slug:{
        type:String,
        unique: true,
        required:true
    },
    posted_at:{
        type:Date,
        required:true,
        default:Date.now
    }
});

PostSchema.plugin(mongoosePaginate);



const PostModel= new mongoose.model('post',PostSchema)
 module.exports = PostModel