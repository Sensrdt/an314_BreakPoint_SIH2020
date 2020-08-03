const { Schema, model } = require('mongoose');

const states = require('../constants/states_uts');

const userSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: '',
    },
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    location: {
        type: String,
        enum: states,
    },
    userType: {
        type: String,
        enum: ['Supplier', 'Prescriber', 'Dispensary'],
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

const User = model('User', userSchema);

module.exports = User;
