const express = require('express');
const router =express.Router();

// require controller
const homecontroller = require('../controller/homeController');

router.get('/', homecontroller.home);

module.exports = router;