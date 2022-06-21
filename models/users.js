const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    username: { type: String, default: null },
    password: { type: String, default: null },
    dateJoined: { type: Date, default: Date.now() },
    userLevel: { type: String, default: null }
},
{ collection : 'users' });

module.exports = mongoose.model("users", userSchema);