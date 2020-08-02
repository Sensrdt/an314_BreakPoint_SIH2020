const { Schema, model } = require('mongoose');

const states = require('../../constants/states_uts');

const schema = new Schema({
    drug: {
        type: String,
        required: true,
    },
    dosage: {
        form: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        strength: {
            type: Number,
            required: true,
        },
    },
    target: {
        type: String,
        required: true,
    },
    ageGroup: {
        type: String,
        enum: ['0-2', '3-16', '17-30', '31-45', '46+'],
        required: true,
    },
    duration: {
        type: Number,
    },
    location: {
        type: String,
        enum: states,
        required: true,
    },
});

const Data = model('data_pres', schema, 'data_pres');

module.exports = Data;
