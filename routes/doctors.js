const express = require('express');
const router = express();
const Doctor = require('../models/doctors');
const cors = require("cors");

router.use(express());
router.use(express.json());
router.use(cors());

//Add Doctors
router.post ("/doctor/add", async (req,res) => {
    const myID = "DOC" + Date.now();
    try{
        const { firstName, lastName, department } = req.body;
        let doctorID = myID;
        const doctor = await Doctor.create({
            firstName, lastName, department, doctorID
            });
        res.status(201).json([{message: 'Doctor Record Added'},
        { firstName: doctor.firstName,
            lastName: doctor.lastName,
            department: doctor.department,
            doctorID: doctor.doctorID
         }]);
        console.log(doctor);
    } catch (err) {
        //res.status(401).send([{message: 'Operation Failed'}, { error: err }])
        console.log(err);
    }
    });
    
module.exports = router;