const mongoose = require("mongoose");
const User = require("./models/User");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//connect mongodb
const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/userdb');
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

// Function to insert a new user
const addUser = async (userData) => {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        console.log("User saved:", savedUser);
    } catch (error) {
        console.error("Error saving user:", error);
    }
};
// API to add a user
app.post('/addUser', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await addUser({ name, email, age });
        res.status(201).json({
            success: true,
            message: "User added successfully",
            user: newUser 
        });  
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error saving user",
            error: error.message
        });
    }
});

// Start the server
const main = async () => {
    await connectDb();
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

main();
