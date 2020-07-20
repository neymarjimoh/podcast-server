const { body, validationResult } = require('express-validator');
const userSignUpValidationRules = () => {
	return [
		body('email')
			.not()
			.isEmpty({ ignore_whitespace: true })
			.withMessage('Email is required')
			.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
			.withMessage('Enter a valid email'),
		body('name')
			.not()
			.isEmpty({ ignore_whitespace: true })
			.withMessage('Last name is required')
			.trim()
			.isLength({ min: 3, max: 15 })
			.withMessage('Name must be between 3 to 15 characters')
			.matches((/^[a-z]{1,}[\s]{0,1}[-']{0,1}[a-z]+$/i))
			.withMessage('Last name can only contain letters'),
		body('password')
			.not()
			.isEmpty()
			.withMessage('Password is required')
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'i')
			.withMessage('Password must contain at least one uppercase letter, one lowercase letter and one numeric digit')
			.isLength({ min: 8 })
			.withMessage('Password must have at least 8 characters'),
		body('passwordConfirm', 'Passwords do not match')
			.exists()
			.custom((value, { req }) => value === req.body.password),
	];
};

const userSignInValidationRules = () => {
	return [
		body('email')
			.not()
			.isEmpty()
			.isEmail()
			.withMessage('Enter a valid email')
			.normalizeEmail(),
		body('password')
			.not()
			.isEmpty()
			.isLength({ min: 8 })
			.withMessage('Password must have at least 8 characters'),
	];
};

// const userEmailRules = () => {
// 	return [
// 		body('email')
// 			.notEmpty()
// 			.isEmail()
// 			.withMessage('Enter a valid email address')
// 			.normalizeEmail(),
// 	];
// };

// const resetPasswordRules = () => {
// 	return [
// 		body('password')
// 			.notEmpty()
// 			.isLength({ min: 8 })
// 			.withMessage('Password must have at least 8 characters'),
// 	];
// };

// const changePasswordRules = () => {
// 	return [
// 		body('oldPassword')
// 		// .if((value, { req }) => req.body.newPassword)
// 			// OR
// 			.if(body('newPassword').exists())
// 			// ...then the old password must be too...
// 			.notEmpty()
// 			// ...and they must not be equal.
// 			.custom((value, { req }) => value !== req.body.newPassword),
	
// 	]
// };

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	userSignUpValidationRules,
	userSignInValidationRules,
	// userEmailRules,
	// changePasswordRules,
	// resetPasswordRules,
	validate,
};
