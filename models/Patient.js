const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientShema = new Schema(
    {
        id: String,
        fullName: String,
        phone: String,
    },
    {
        timestamps: true
    }
);

const Patient = mongoose.model('Patient');

module.exports = Patient;