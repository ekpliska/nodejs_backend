const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentShema = new Schema(
    {
        id: String,
        user_id: {
            type: Schema.Types.ObjectId, ref: 'Patient'
        },
        teeth_number: Number,
        diagnosis: String,
        price: Number,
        date: String,
        time: String,
    },
    {
        timestamps: true
    }
);

const Appointment = mongoose.model('Appointment', AppointmentShema);

module.exports = Appointment;