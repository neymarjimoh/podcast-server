const { check, validationResult } = require('express-validator');
const podcastValidation = () => {
	return [
		check('title')
			.not()
			.isEmpty()
			.withMessage('Title is required'),
		check('description')
			.not()
			.isEmpty()
			.withMessage('Podcast description is required')
			.trim()
			.isLength({ min: 8 })
			.withMessage('Descriptoion must be more than 8 characters long'),
	];
};

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
	podcastValidation,
	validate,
};
