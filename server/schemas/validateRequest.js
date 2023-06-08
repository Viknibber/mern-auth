const { validationResult } = require('express-validator');

const validateRequest = (msg) => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ msg, err: errors.array() });

        next();
    };
};

module.exports = validateRequest;
