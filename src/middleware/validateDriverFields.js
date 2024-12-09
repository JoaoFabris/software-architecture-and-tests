const checkRequiredFields = require('../utils/checkRequiredFields');

const validateDriverFields = (req, res, next) => {
    const { body } = req;
    const receivedFields = ['name'];

    const error = checkRequiredFields(body, receivedFields);
    if (error) {
        return res.status(400).json({ message: 'error' });
    }

    return next();
};

module.exports = validateDriverFields;