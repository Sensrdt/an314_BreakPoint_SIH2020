const { Schema, model } = require('mongoose');

const schema = new Schema({
    drug: {
        type: 'String',
    },
    dosage: {
        form: {
            type: 'String',
        },
        route: {
            type: 'String',
        },
        strength: {
            type: 'String',
        },
    },
    target: {
        type: 'String',
    },
    ageGroup: {
        type: 'Number',
    },
});

const Data = model('data_pres', schema, 'data_pres');

module.exports = Data;
