const { Appointment, Patient } = require('../models');
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

const create = async function (req, res) {
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

    try {
        patient = await Patient.findOne({ _id: data.patient });
    } catch (e) {
        return res.status(404).json({
            success: false,
            message: 'PATIENT_NOT_FOUND',
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

const remove = function(req, res) {
    const id = req.params.id;
    Appointment.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }

        res.json({ success: true });
    });
}

AppointmentContoller.prototype = {
    all,
    create,
    remove,
}

module.exports = AppointmentContoller;