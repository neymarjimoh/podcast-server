const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// user  and admin creation
const create = async (req, res) => {
    const { email, name, password, passwordConfirm, role } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({
                status: '409 Error',
                message: 'User already exists',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            passwordConfirm,
        });
        const savedUser = await user.save();
        return res.status(201).json({
            status: '201 Created',
            message: 'User created successfully',
            data: savedUser,
        });
    } catch (error) {
        console.log('Error from creating a user >>> \n', error);
        return res.status(500).json({
            status: '500 Error',
            message: "Problem Occurred trying to process your request",
        });
    }
};

// admin and user sign in
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: '404 Error',
                message: 'Incorrect user credentials',
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: '401 Error',
                message: 'Incorrect user credentials',
            });
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                role: user.role,
            },
            config.JWT_SECRET,
            {
                expiresIn: '1d',
            }
        );
        return res.status(200).json({
            status: '200 OK',
            message: "User signed in successfully",
            user,
            token,
        });
    } catch (error) {
        console.log('Error from logging in a user >>> \n', error);
        return res.status(500).json({
            status: '500 Error',
            message: "Problem Occurred trying to process your request",
        });
    }
};

module.exports = {
    create,
    login,
};