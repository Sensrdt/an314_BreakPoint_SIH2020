const { Schema, model } = require('mongoose');

const states = require('../../constants/states_uts');

const schema = new Schema({
    drug: {
        type: String,
        required: true,
    },
    dosage: {
        type: {
            form: {
                type: String,
            },
            strength: {
                type: Number,
            },
        },
        required: true,
    },
    quantity: {
        type: {
            amount: Number,
            sub_amount: Number,
            scale: String,
        },
        required: true,
    },
    location: {
        type: String,
        enum: states,
        required: true,
    },
});

const Data = model('data_disp', schema, 'data_disp');

module.exports = Data;
