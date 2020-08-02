const { Schema, model } = require('mongoose');

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
    userType: {
        type: String,
        enum: ['Supplier', 'Prescriber', 'Dispensary'],
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});

const User = model('User', userSchema);

module.exports = User;
