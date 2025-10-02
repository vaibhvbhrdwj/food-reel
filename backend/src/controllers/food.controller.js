const foodModel = require('../models/food.model');
const srorageService= require ('../services/storage.service');
const { v4 : uuid } = require('uuid');

async function createFood (req , res) {

    console.log(req.foodPartner);

    console.log(req.body);

    console.log(req.file);


    const fileUploadResult = await srorageService.uploadFile(req.file.buffer,uuid());

    const foodItem = await foodModel.create({
        name : req.body.name,
        description : req.body.description,
        video : fileUploadResult.url,
        foodPartner : req.foodPartner._id
    })

    res.status(201).json({
        message : "food Created successfully",
        food : foodItem
    })
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});
    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({
      message: "An error occurred while fetching food items",
      error: error.message,
    });
  }
}


module.exports = {
    createFood,
getFoodItems
}