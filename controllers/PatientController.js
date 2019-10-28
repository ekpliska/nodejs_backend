const { Patient } = require('../models');
const { validationResult } = require('express-validator');

function PatientController() {

}

const all = function (req, res) {
    Patient.find({}, function (err, docs) {
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
    });
}

const create = function (req, res) {
    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone,
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()
        });
    }

    Patient.create(data, function (err, doc) {
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

const update = function (req, res) {
    const patientId = req.params.id;
    const errors = validationResult(req);

    const data = {
        fullname: req.body.fullname,
        phone: req.body.phone,
    };

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()
        });
    }

    Patient.updateOne(
        { _id: patientId },
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
                    message: 'Patient not forund',
                })
            }

            res.status(200).json({
                success: true,
                data: doc,
            });
        })

}

const remove = async function (req, res) {
    const id = req.params.id;

    try {
        await Patient.findOne({ _id: id });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Patient not found',
        })
    }

    Patient.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err,
            });
        }

        res.json({ success: true });
    });
}

const show = async function (req, res) {
    const id = req.params.id;
    try {
        const data = await Patient.findById(id).exec();
        res.status(200).json({
            success: true,
            message: data
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Patient not found',
        });
    }
}

PatientController.prototype = {
    all,
    create,
    update,
    remove,
    show,
}

module.exports = PatientController;