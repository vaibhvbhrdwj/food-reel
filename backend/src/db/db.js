const mongoose = require ('mongoose');

    require('dotenv').config();
function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MngoDb connected");
    })
    .catch((err) =>{
        console.log("MongoDb connection error:" , err);
    })
}

module.exports = connectDB;