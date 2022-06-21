const express = require('express');
const router = express();
const Patient = require('../models/patients');
const ID = require('../models/ids');
const cors = require("cors");
const { isNull } = require('lodash');

router.use(express());
router.use(express.json());
router.use(cors());

//Add Patients
router.post ('/patient/add', async (req, res) => {
    //const myID = "HOSPITAL_ID" + Date.now();
    const myID = await ID.findOne({isTaken: false});
    const patID = await Patient.find().sort({id:-1}).limit(1);

    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        genotype: req.body.genotype,
        bloodGroup: req.body.bloodGroup,
        patientID: myID.id
    });

    if (patID[0] === undefined) {
        patient.id = 0;
    }
    else
    {
        if ((patID[0].id) === null) {
        patient.id = 0;
        }
        else 
        {patient.id = patID[0].id + 1;
        };
    }

    try{
        const newPatient = await patient.save();
        await ID.updateOne({ id: myID.id }, { isTaken: true });
        res.status(201).json([{message: 'Patient Record Added'},
        { firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            gentder: patient.gender,
            bloodGroup: patient.bloodGroup,
            patientID: patient.patientID,
            dateJoined: patient.dateJoined,
            id: patient.id
         }]);
        console.log(patient);
        console.log(myID.id);
        console.log(patID);
        console.log(patID[0].id);
    } catch (err) {
        //res.status(401).send([{message: 'Operation Failed'}, { error: err }])
        console.log(err);
    }
    });



module.exports = router;