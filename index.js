require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');
const recordRouter = require('./routes/patientRecords');
const userRouter = require('./routes/users');
const app = express();
const { MONGO_URI } = process.env;

//connecting to database
mongoose.connect(MONGO_URI, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("Database Connected successfully");
});

app.use(patientsRouter);
app.use(doctorsRouter);
app.use(recordRouter);
app.use(userRouter);
app.use(express.json());
app.use(cors());
const port1 = process.env.MAIN_PORT;
app.listen(port1, () => console.log(`API Server is running on port ${port1}`));





