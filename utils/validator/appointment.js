const { check } = require('express-validator');

const vaidation = {
    create: [
        check('teethNumber').isInt({ min: 1, max: 48 }),
        check('diagnosis').isLength({ min: 6, max: 120 }),
        check('price').isDecimal(),
        check('date').isLength({ min: 3, max: 20 }),
        check('time').isLength({ min: 5, max: 5 }),
        check('patient').isLength({ max: 100 }),
    ],
    update: [
        check('teethNumber').isInt({ min: 1, max: 48 }),
        check('diagnosis').isLength({ min: 6, max: 120 }),
        check('price').isDecimal(),
        check('date').isLength({ min: 3, max: 20 }),
        check('time').isLength({ min: 5, max: 5 }),
        check('patient').isLength({ max: 100 }),
    ]
};

module.exports = vaidation;