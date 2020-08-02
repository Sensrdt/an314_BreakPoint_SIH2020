const { Schema, model } = require('mongoose');

const schema = new Schema({
    drug: {
        type: 'String',
    },
    dosage: {
        form: {
            type: 'String',
        },
        strength: {
            type: 'String',
        },
    },
    quantity: {
        amount: 'Number',
        sub_amount: 'Number',
        scale: 'String',
    },
});

const Data = model('data_disp', schema, 'data_disp');

module.exports = Data;
