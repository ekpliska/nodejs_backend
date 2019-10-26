const { Appointment } = require('../models');
const { validationResult } = require('express-validator');

function AppointmentContoller() {

}

const all = function (req, res) {
    Appointment
        .find({})
        .populate('patient')
        .exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                })
            }
            res.json({
                success: true,
                data: docs
            });
        })
}

const create = function (req, res) {
    const data = {
        teethNumber: req.body.teethNumber,
        diagnosis: req.body.diagnosis,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        patient: req.body.patient,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()
        });
    }

    Appointment.create(data, function (err, doc) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        res.status(201).json({
            success: true,
            data: doc,
        })
    })
}

AppointmentContoller.prototype = {
    all,
    create,
}

module.exports = AppointmentContoller;