const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const foodPartnerModel = require("../models/foodpartner.model");

require('dotenv').config();
const secret = process.env.JWT_SECRET; 

async function registerUser(req,res){

    const { fullName, email , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await userModel.create({
        fullName, 
        email,
       password : hashedPassword
    })

    const token = jwt.sign({id:user._id}, secret);  

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered succesfully",
        user:{
            _id: user._id,
            email : user.email,
            fullName : user.fullName
        }
    })
}

async function loginUser(req,res){
    const  {email , password } = req.body;

    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message : "Invalid Password or Email"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign({id: user._id},secret);

    res.cookie("token",token)

    res.status(200).json({
        message:"User loggen in Succesfully"
    })
}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}


async function registerFoodPartner(req,res){
    const{name , email , password} = req.body;

    const isPartnerAlreadyExists = await foodPartnerModel.findOne({
        email
    })  
    if(isPartnerAlreadyExists){
        res.status(201).json({
            message :"Food Partner account already exists"
        })
    } 
    const hashedPassword = await bcrypt.hash(password , 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword
    })
    const token = jwt.sign ({id : foodPartner._id}, secret)
    
    res.cookie("token", token)

    res.status(201).json({
        message : "Food Partner registered successfully",
        foodPartner :{
            _id : foodPartner._id,
            email : foodPartner.email,
            name : foodPartner.name
        }
    })
}

async function loginFoodPartner(req,res){
    const {email , password } = req.body;
        const foodPartner = await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message : "Invalid Password or Email"
        })
    }
    const isPasswordValid = await bcrypt.compare(password , foodPartner.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign({id: foodPartner._id},secret);

    res.cookie("token",token)

    res.status(200).json({
        message:"User loggen in Succesfully",
        foodPartner :{
            _id : foodPartner._id,
            email : foodPartner.email,
            name : foodPartner.name
        }
    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message : "Food partner logged out successfully"
    });
}



module.exports ={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}
