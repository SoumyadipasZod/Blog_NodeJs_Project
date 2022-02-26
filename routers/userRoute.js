const express = require('express');
const router = express.Router();
const usercontroller =require('../controller/userController');
const verify=require('../middlewares/verifyRegister');


// loginpage
router.get('/login',usercontroller.login); 
router.post('/add-login',usercontroller.addLogin);

// resgister page
router.get('/register',usercontroller.register); 
router.post('/add-register',[verify.verifyRegister],usercontroller.addRegister);//submit data to mongodb.

// dashboard page
// router.get("/dashboard", usercontroller.userAuth, usercontroller.dashboard); 
 

// logout
router.get("/logout", usercontroller.logout); 






module.exports =router;

