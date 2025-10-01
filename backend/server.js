// Start Server

const app= require('./src/app');
const PORT = 3000;
const connectDB = require('./src/db/db');

connectDB();

app.listen(3000, () =>{
    console.log("Server listening on Port");
})

