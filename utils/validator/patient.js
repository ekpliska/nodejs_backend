const { check } = require('express-validator');

const vaidation = {
    create: [
        check('fullname').isLength({ min: 3, max: 70 }),
        check('phone').isLength({ min: 12, max: 12 }),
    ]
};

module.exports = vaidation;