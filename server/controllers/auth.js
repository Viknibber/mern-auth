const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signTokens = (res, id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'lax' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax' });
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

module.exports = { register, login, refresh };
