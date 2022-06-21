const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    firstName: { type: String, default: Date.now() },
    lastName: { type: String, default: null },
    department: { type: String, default: null },
    doctorID: String
},
{ collection : 'doctors' });

module.exports = mongoose.model("doctors", doctorSchema);