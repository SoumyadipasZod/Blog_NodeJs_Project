const express = require('express');
const router =express.Router();

const postcontroller =require('../controller/postController');


router.get('/post',postcontroller.loginAuthCheck,postcontroller.post);
router.post('/addpost',postcontroller.addPost);
router.get('/viewpost/:slug',postcontroller.postAuth,postcontroller.viewPost);


module.exports =router;