const express = require('express');
const router =express.Router();

const aboutcontroller =require('../controller/aboutController');


router.get('/about',aboutcontroller.about);


module.exports = router;