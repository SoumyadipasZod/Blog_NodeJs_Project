const express =require('express');
const router =express.Router();

const PostControllerApi = require('../controller/postControllerApi');

router.get('/post',[PostControllerApi.loginAuthCheck],PostControllerApi.post);
router.post('/addpost',PostControllerApi.addPost);
router.get('/viewpost/:slug',PostControllerApi.postAuth,PostControllerApi.viewPost);



module.exports =router;