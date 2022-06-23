const mongoose = require("mongoose");
const { Schema } = mongoose;

const recordSchema = new mongoose.Schema({
    dateOfVisit: { type: Date, default: Date.now() },
    pressure: Number,
    weight: Number,
    temperature: Number,
    symptoms: { type:String, required:true },
    diagnosis: { type:String },
    recommendation: { type:String },
    doctorAssigned: { type:String },
    patientID: String
},
{ collection : 'records' });

module.exports = mongoose.model("patientRecord", recordSchema);