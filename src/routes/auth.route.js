const express = require('express');
const authRoute = express.Router();
const { login, create } = require('../controllers/auth.controller');
const { 
    userSignUpValidationRules,
    userSignInValidationRules, 
    validate,
} = require('../validation/auth.validation');

authRoute.post('/signup', userSignUpValidationRules(), validate, create);
authRoute.post('/login', userSignInValidationRules(), validate, login);

module.exports = authRoute;