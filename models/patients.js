const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new mongoose.Schema({
    firstName: { type: String, default: Date.now() },
    lastName: { type: String, default: null },
    dateOfBirth: Schema.Types.Date,
    gender: { type: String, default: null },
    genotype: { type: String, default: null },
    bloodGroup: { type: String, default: null },
    patientID: String,
    dateJoined: { type: Date, default: Date.now() },
    id: Number
},
{ collection : 'patients' });

module.exports = mongoose.model("patients", patientSchema);