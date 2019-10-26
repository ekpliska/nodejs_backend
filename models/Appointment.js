const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentShema = new Schema(
    {
        id: String,
        teethNumber: Number,
        diagnosis: String,
        price: Number,
        date: String,
        time: String,
        patient: {
            type: Schema.Types.ObjectId, ref: 'Patient'
        },
    },
    {
        timestamps: true
    }
);

const Appointment = mongoose.model('Appointment', AppointmentShema);

module.exports = Appointment;