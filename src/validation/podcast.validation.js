const { body, validationResult } = require('express-validator');
const podcastValidation = () => {
	return [
		body('title')
			.not()
			.isEmpty({ ignore_whitespace: true })
			.withMessage('Title is required'),
		body('description')
			.not()
			.isEmpty({ ignore_whitespace: true })
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
