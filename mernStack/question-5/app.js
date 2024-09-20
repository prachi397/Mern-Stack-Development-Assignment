const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../question-4/models/User");

dotenv.config();

const app = express();
app.use(express.json());

//connect mongodb
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}
connectDb();

//route to fetch user by email
app.get('/user/:email', async(req,res)=>{
    try{
        const email = req.params.email;
        const user = await User.findOne({email});
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(400).json({message : "User not found"});
        }
    }
    catch(err){
        console.error("Error fetching user:", err);  
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});