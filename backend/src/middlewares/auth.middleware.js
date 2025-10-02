const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require ("jsonwebtoken");



async function authFoodPartnerMiddleware(req, res , next ){
    
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : "Please Login first"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next()

    } catch (err) {
        return res.status(401).json({
            message : "Invalid token"
        })
    }
}


async function authUserMiddleWare(req , res , next){
    
    const token = req.cookies.token;

    if(!token){
         return  res.status(401).json({
        message : "please login first"
    })
}
try {
    const decoded = jwt.verify(token , process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    req.user = user

    next()
}
catch(err){
    return res.status(401).json({
        message : "Invalid Token"
    })
}
}

module.exports ={
    authFoodPartnerMiddleware,
    authUserMiddleWare
}