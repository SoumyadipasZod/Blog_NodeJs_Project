const express =require('express');
const router = express.Router();
const usercontrollerapi =require('../controller/userControllerApi');
const verify=require('../middlewares/verifyRegisterApi');


router.get('/',usercontrollerapi.login);
router.post('/add-login',usercontrollerapi.addLogin);
router.get('/register',usercontrollerapi.register);
router.post('/add-register',[verify.verifyRegister],usercontrollerapi.addRegister);//submit data to mongodb.
router.get("/logout", usercontrollerapi.logout); 




module.exports =router;