const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = (req, res, next) => {
    // const header = req.headers.authorization || req.header.Authorization;
    // if (!header?.startsWith('Bearer ')) return res.status(401).json({ msg: 'unauthorizedRequest' });

    // const token = header.split(' ')[1];

    if (!req.cookies?.accessToken) return res.status(401).json({ msg: 'unauthorizedRequest' });
    const token = req.cookies.accessToken;

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (error, decoded) => {
        if (error) return res.status(403).json({ msg: 'forbiddenRequest' });

        try {
            const user = await User.findById(decoded.id).select('-password');
            req.user = user;

            next();
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'serverError' });
        }
    });
};

module.exports = authenticateUser;
