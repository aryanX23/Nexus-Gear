const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartitems: {
        type: Array
    },
    previousorders: {
        type: Array
    },
    token: {
        type: String
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;