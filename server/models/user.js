const mongoose = require('mongoose');


let userModel = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    }
});

module.exports.User = userModel;