// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3100;

app.use(express.json());

//connect mongodb
const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://mongo:27017/mydatabase');
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}
connectDb();

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js and MongoDB Docker app!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
