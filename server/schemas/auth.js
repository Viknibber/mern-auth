const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const validateRequest = require('./validateRequest');
const User = require('../models/User');

const register = [
    body('name').trim().notEmpty().withMessage('nameRequired'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emailRequired')
        .isEmail()
        .withMessage('invalidEmail')
        .normalizeEmail()
        .custom(async (email) => {
            const checkUser = await User.findOne({ email });
            if (checkUser) throw new Error('uniqueEmailRequired');
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage('passwordRequired')
        .isLength({ min: 6 })
        .withMessage('minPasswordLength')
        .isLength({ max: 24 })
        .withMessage('maxPasswordLength')
        .custom((password, { req }) => {
            if (password !== req.body.password2) throw new Error('unmatchedPasswords');
            return true;
        }),
    body('password2').notEmpty().withMessage('confirmPasswordRequired'),
    validateRequest('registrationFailed'),
];

const login = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('emailRequired')
        .isEmail()
        .withMessage('invalidEmail')
        .normalizeEmail()
        .custom(async (email) => {
            const checkUser = await User.findOne({ email });
            if (!checkUser) throw new Error('nonexistentEmail');
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage('passwordRequired')
        .custom(async (password, { req }) => {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return true;

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error('incorrectPassword');

            return true;
        }),
    validateRequest('loginFailed'),
];

module.exports = { register, login };
