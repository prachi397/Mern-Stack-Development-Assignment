const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
