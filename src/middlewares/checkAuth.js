const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

const checkToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(412).json({
            status: '412 Error',
            message: 'Access denied!! Missing authorization credentials',
        });
    }

    let token = req.headers.authorization;

    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
              status: '401 Error',
              message: 'You are not authorized to access this route.'
            });
        }
        req.user = user;
        return next();
    } catch (error) {
        console.log("Error from user authentication >>>>> ", error);
        if (error.name === 'TokenExpiredError') {
            return res.status.json({
                error: true,
                message: 'Token expired.',
            });
        }
        return res.status(401).json({
            message: 'You must be logged in..'
        });
    }
};

const verifyAdmin = async (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin') {
        return res.status(403).json({
            status: '403 Error',
            message: 'You\re not authorized to make this request',
        });
    }
    return next();
};

module.exports = {
    checkToken,
    verifyAdmin,
};