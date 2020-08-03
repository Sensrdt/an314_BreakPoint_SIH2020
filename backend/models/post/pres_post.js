const { Schema, model } = require('mongoose');

const states = require('../../constants/states_uts');
const ages = require('../../constants/age_groups');

const schema = new Schema({
    drug: {
        type: String,
        required: true,
    },
    dosage: {
        form: {
            type: String,
            required: false,
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
        enum: ages,
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
