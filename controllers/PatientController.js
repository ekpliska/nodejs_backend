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
        fullName: req.body.fullName,
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

PatientController.prototype = {
    all,
    create,
}

module.exports = PatientController;