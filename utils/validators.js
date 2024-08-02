// validators.js
const { body } = require('express-validator');

const postValidationRules = () => {
    return [
        body('title')
            .isString().withMessage('Title is required and must be a string')
            .custom(value => {
                if (value.length < 5) {
                    throw new Error('Title must be at least 5 characters long');
                }
                return true;
            }),
        body('summary').optional().isString().withMessage('Summary must be a string if provided'),
        body('content')
            .isString().withMessage('Content is required and must be a string')
            .custom(value => {
                if (value.length < 20) {
                    throw new Error('Content must be at least 20 characters long');
                }
                return true;
            }),
        body('tags').optional().isArray().withMessage('Tags must be an array if provided'),
        body('tags.*').isString().withMessage('Each tag must be a string'),
        body('author')
            .isString().withMessage('Author is required and must be a string')
            .custom(value => {
                if (value.length < 3) {
                    throw new Error('Author name must be at least 3 characters long');
                }
                return true;
            }),
        body('date').optional().isISO8601().withMessage('Date must be in ISO 8601 format'),
        body('likes').optional().isInt({ min: 0 }).withMessage('Likes must be a non-negative integer'),
    ];
};

module.exports = { postValidationRules };
