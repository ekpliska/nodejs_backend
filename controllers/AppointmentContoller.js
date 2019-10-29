const { Appointment, Patient } = require('../models');
const { validationResult } = require('express-validator');
const { groupBy, reduce } = require('lodash');

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

            const group = groupBy(docs, 'date');

            res.json({
                success: true,
                data: reduce(
                    group,
                    (result, value, key) => {
                        result = [...result, { title: key, data: value }];
                        return result;
                    }, [])
            });
        });
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
        await Patient.findOne({ _id: data.patient });
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

const update = async function (req, res) {
    const appointmentId = req.params.id;
    const errors = validationResult(req);
    const data = {
        teethNumber: req.body.teethNumber,
        diagnosis: req.body.diagnosis,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }

    Appointment.updateOne(
        { _id: appointmentId },
        { $set: data },
        function (err, doc) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }

            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Appointment not forund',
                })
            }

            res.status(200).json({
                success: true,
                data: doc,
            });
    })
}

const remove = async function(req, res) {
    const id = req.params.id;

    try {
        await Appointment.findOne({ _id: id });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Appointment not found',
        })
    }

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
    update,
    remove,
}

module.exports = AppointmentContoller;