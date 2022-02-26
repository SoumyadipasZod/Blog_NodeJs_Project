const express = require('express');
const router =express.Router();
const admincontroller =require('../controller/adminController');


router.get('/',admincontroller.login);
router.post('/addlogin',admincontroller.addlogin);
router.get('/admin-dashboard',admincontroller.adminAuth,admincontroller.dashboard);
router.get('/logout',admincontroller.logout);



module.exports = router;