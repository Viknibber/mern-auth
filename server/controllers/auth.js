const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signTokens = (res, id) => {
    const ACCESS_EXPIRY_TIME = 5 * 60;
    const REFRESH_EXPIRY_TIME = 24 * 60 * 60;
    // const ACCESS_EXPIRY_TIME = 10;
    // const REFRESH_EXPIRY_TIME = 30;

    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY_TIME });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY_TIME });

    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', maxAge: ACCESS_EXPIRY_TIME * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: REFRESH_EXPIRY_TIME * 1000 });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        signTokens(res, user._id);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'serverError' });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('-password');

        signTokens(res, user._id);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'serverError' });
    }
};

const refresh = (req, res) => {
    if (!req.cookies?.refreshToken) return res.status(401).json({ msg: 'unauthorizedRequest' });
    const token = req.cookies.refreshToken;

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ msg: 'refreshFailed' });

        signTokens(res, decoded.id);
        res.status(201).json({ msg: 'refreshSuccess' });
    });
};

const logout = (req, res) => {
    if (!req.cookies?.accessToken && !req.cookies?.refreshToken) return res.sendStatus(204);

    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('refreshToken', { httpOnly: true });
    res.sendStatus(200);
};

module.exports = { register, login, refresh, logout };
