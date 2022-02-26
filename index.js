const express = require('express');
const mongoose =require('mongoose');
const ejs = require('ejs');
const path =require('path');
const cookieparser =require('cookie-parser');
const session =require('express-session');
// var morgan = require("morgan");
const jwt =require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const multer =require('multer');
const { diskStorage } = require('multer');
const flash=require('connect-flash');


const app =express();

// mongodb connection
const dbDriver ="mongodb+srv://Soumyadip:Panja21031998@cluster0.cf1ge.mongodb.net/slug_role_rough";

// ejs and set viewengine
app.set('view engine', 'ejs');
app.set('views','views');

// step-2 file upload
app.use('/upload',express.static(path.join(__dirname,'upload')));

// step-3 diskStorage
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

// step-4 file type
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg")){
        cb(null,true)
    }
    else{
        cb(null,false)
    }    
}

// step-5 file upload
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))

// making public folder for static
app.use(express.static(path.join(__dirname,"public")));

// make cookie session
app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: "soumyadip123",
    resave: false,
    saveUninitialized: false
}));

// use cookieparser
app.use(cookieparser());

// use flash
app.use(flash());

// urlencoded|bufferdata
app.use(express.urlencoded({
    extended: true
}));

// set userToken Authentication
const userAuth=require('./middlewares/userAuth');
app.use(userAuth.authJwt);

// set adminToken Authentication
const adminAuth =require('./middlewares/adminAuth');
app.use(adminAuth.authJwt);
// userrouter
const UserRoute = require('./routers/userRoute');
app.use(UserRoute);

// homerouter
const HomeRoute =require('./routers/homeRoute');
app.use(HomeRoute);

// aboutrouter
const AboutRoute =require('./routers/aboutRoute');
app.use(AboutRoute);

// postrouter
const PostRoute =require('./routers/postRouter');
app.use(PostRoute);

// adminrouter
const AdminRoute =require('./routers/adminRoute');
app.use('/admin',AdminRoute);

// userApi Router
const UserApi = require('./routers/userRouteApi');
app.use('/userapi',UserApi);

// postApi Router
const PostApi = require('./routers/postRouterApi');
app.use('/postapi',PostApi);

// adminApi Router
const AdminApi =require('./routers/adminRouteApi');
app.use('/adminapi',AdminApi);

// established connection
const port =process.env.PORT ||2102;
mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(result => {
    app.listen(port,() =>{
        console.log(result,`db is connected`);
        console.log(`server running at http://localhost:${port}`);
    })
}).catch(err =>{
    console.log(err)
})
