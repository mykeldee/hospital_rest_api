const mongoose = require("mongoose");

const idSchema = new mongoose.Schema({
    id: String,
    isTaken: { type: Boolean, default: false },
},
{ collection : 'ids' });

module.exports = mongoose.model("ids", idSchema);