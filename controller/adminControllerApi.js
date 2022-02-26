const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
// require model
const Model =require('../models/UserModel');



// adminlogin api
exports.adminLogin =(req,res) =>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Admin Login Page'
    })
}

// add login api
exports.admiAddLogin =(req,res) =>{
    Model.findOne({
        email:req.body.email
    },(err,data)=>{
        if(data){
            if(data.status && data.role==='admin'){
                const hashpwd=data.password;
                if(bcrypt.compareSync(req.body.password, hashpwd)){
                    const token=jwt.sign({
                        id:data._id,
                        username:data.username,
                        email:data.email,
                        role:data.role
                    },'soumyadip@21031998',{expiresIn:'5m'})
                    res.cookie('adminToken',token);
                    // console.log(data);
                    res.status(200).json({
                        status:'success',
                        message:'welcome to Admin Dashboard'
                    })
                }else{
                    // req.flash('message','Invalid Password');
                    console.log('invalid password');
                    res.status(405).json({
                        result:err,
                        status:'invalid password'
                    })
                }
            }else{
                // req.flash('message','Account is not verified')
                console.log('account not verified');
                res.status(405).json({
                    result:err,
                    message:'Account is not verified'
                })
            }
        }else{
            // req.flash('message','Invalid email');
            console.log('invalid email');
            res.status(405).json({
                result:err,
                status:'invalid email'
            })
        }
    })
}

// admin log out
exports.logout =(req, res) => {
    res.clearCookie('adminToken');
    res.status(200).json({
        status:'success',
        message:'Successfully logged out'
    })
}