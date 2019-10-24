const { Patient } = require('../models');

function PatientController() {

}

all = function (req, res) {
    Patient.find({}, function (err, docs) {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err
            })
        }
        return req.json({
            status: 'success',
            data: docs
        });
    });
}

const create = function (req, res) {
    Patient.create(data, function (err, doc) {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err
            });
        }
        return req.status(201).json({
            status: 'success',
            data: doc,
        })
    })
}

PatientController.prototype = {
    all,
    create,
}

module.exports = PatientController;