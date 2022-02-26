const express =require('express');
const router =express.Router();
const adminControllerApi =require('../controller/adminControllerApi');


router.get('/',adminControllerApi.adminLogin);
router.post('/adminpostlogin',adminControllerApi.admiAddLogin);
router.get('/logout',adminControllerApi.logout);



module.exports =router;