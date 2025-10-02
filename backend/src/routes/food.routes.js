const express = require ('express');
const foodController = require("../controllers/food.controller")
const router = express.Router();
const authMiddleware = require ( "../middlewares/auth.middleware");
const multer = require ("multer");


const upload = multer({
    storage : multer.memoryStorage(),
})

//since in app.js we used the prefix /api/food and should be protected
router.post('/' , authMiddleware.authFoodPartnerMiddleware , upload.single("video") , foodController.createFood)// req,res,next

//. /api/food/ protected
router.get("/",
    authMiddleware.authUserMiddleWare,
    foodController.getFoodItems
)

module.exports = router;