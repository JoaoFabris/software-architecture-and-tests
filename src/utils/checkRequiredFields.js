const checkRequiredFields = (receivedFields, requiredFields) => {
    for (let i = 0; i < receivedFields.length; i += 1) {
        const currField = requiredFields[i];
        if (!(currField in receivedFields)) {
            return `${currField} is missing`;
        }
    }
};

module.exports = checkRequiredFields;