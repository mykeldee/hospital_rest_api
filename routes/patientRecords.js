const express = require('express');
const router = express();
const Record = require('../models/patientRecords');
const Patient = require('../models/patients');
const cors = require("cors");

router.use(express());
router.use(express.json());
router.use(cors());

//Add Records
router.post ("/record/add", async (req,res) => {
    //check to see if the patient exists in the patients collection
    const patient = await Patient.findOne({patientID: req.body.patientID}).exec();

    console.log(patient);
    //if user does not exist, send a 404 response
    if (patient == null) {
        res.status(404).json({ message: "Patient does not exist!" })
    } else {    
        try{
            const { pressure, temperature, weight, symptoms, recommendation, diagnosis, patientID, doctorAssigned  } = req.body;
            const record = await Record.create({
                pressure, temperature, weight, symptoms, recommendation, diagnosis, patientID, doctorAssigned
                });
            res.status(201).json([{message: 'Patient Record Added'},
            { dateOfVisit: record.dateOfVisit,
                pressure: record.pressure,
                weight: record.weight,
                temperature: record.temperature,
                symptoms: record.symptoms,
                diagnosis: record.diagnosis,
                recommendation: record.recommendation,
                patientID: record.patientID,
                doctorAssigned: record.doctorAssigned
            }]);
            console.log(record);
        } catch (err) {
            res.status(401).send([{message: 'Operation Failed'}, { error: [err.message, err.status] }])
            console.log(err);
        }
    }
    });

//Retrieve Patient Records
router.get('/patient/:id', (req, res) => {
    try{
        Patient.findOne({id: req.params.id}).then(async (result) => {
        //Patient.findById(req.params.id).then(async (result) => {
            const records = await Record.find({patientID: result.patientID}).select({"_id":0, "__v": 0});
            console.log(records);
            res.status(200).json({ name: `${result.firstName} ${result.lastName}`, records: records });
    });
} catch (err) {
    res.status(500).send([{message: 'Operation Failed'}, { error: err.message }]);
    console.log(err);
}
});

module.exports = router;