const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// requiring user model
const userModel = require('../models/UserModel');
// login
exports.login = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'welcome to login page'
    })
}

exports.addLogin = (req, res, next) => {
    userModel.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            if (data.status && data.role === 'user') {
                const hashpwd = data.password;
                if (bcrypt.compareSync(req.body.password, hashpwd)) {
                    const token = jwt.sign({
                        id: data._id,
                        username: data.username,
                        email: data.email,
                        role: data.role
                    }, 'soumyadip@21031998', {
                        expiresIn: '5m'
                    })
                    res.cookie('userToken', token);
                    console.log('welcome to dashboard');
                    res.status(200).json({
                        status: 'success',
                        message: 'Welcome to User Dashboard'
                    })
                } else {
                    console.log('Invalid Password');
                    res.status(405).json({
                        result: err,
                        message: 'Invalid Password'
                    })
                }
            } else {
                console.log('Account is not verified');
                res.status(405).json({
                    result: err,
                    message: 'Account not verified'
                })
            }
        } else {
            // req.flash('message','Invalid email');
            console.log('Invalid email');
            res.status(405).json({
                result: err,
                message: 'Invalid email'
            })
        }
    })
}

// register
exports.register = (req, res) => {
    console.log('welcome to register page');
    res.status(200).json({
        status: 'success',
        message: 'welcome to registration page'
    })
}

// addregister
exports.addRegister = (req, res) => {
    const user = new userModel({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    })
    user.save((err,data) =>{
        if(!err){
            console.log('User Added Successfully');
        res.status(200).json({
            status: 'success',
            result: data,
            message:'User Added Successfully'
        })
        }else{
            console.log('user not added successfully');
            res.status(405).json({
                result: err,
                message:'User not added'
            })
        }
    })
}

// logout
exports.logout = (req, res) => {
    res.clearCookie('userToken');
    res.status(200).json({
        status: 'success',
        message: 'User logged out successfully'
    })
}