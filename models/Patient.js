const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientShema = new Schema(
    {
        id: String,
        fullname: String,
        phone: String,
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model('Patient', PatientShema);

module.exports = Patient;