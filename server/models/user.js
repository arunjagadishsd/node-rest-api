const mongoose = require('mongoose');
const validator = require('validator');



let userModel = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true,
        validate:{
            validator : validator.isEmail,
            message:"{VALUE} is Not valid email."
        }
    },
    password:{
        type:String,
        minlength: 6
    },
    tokens:[{
        access:{
            type:String,
            required: true
        },
        tokens:{
            type:String,
            required: true
        }
    }]
});

module.exports.User = userModel;