const express = require('express');
const authRoute = express.Router();
const { login, create } = require('../controllers/auth.controller');
const { 
    userSignUpValidationRules,
    userSignInValidationRules, 
    validate,
} = require('../validation/auth.validation');

authRoute.post('/user/signup', userSignUpValidationRules(), validate, create);
authRoute.post('/user/login', userSignInValidationRules(), validate, login);
authRoute.post('/admin/signup', userSignUpValidationRules(), validate, create);
authRoute.post('/admin/login', userSignInValidationRules(), validate, login);

module.exports = authRoute;