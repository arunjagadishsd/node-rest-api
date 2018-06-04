const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is Not valid email."
        }
    },
    password: {
        type: String,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    // to convert mongoose var to regular object
    let userObject = user.toObject();
    // to only return the email and id
    return _.pick(userObject, ['_id', 'email']);
};
//  To generate auth tokens
UserSchema.methods.generateAuthToken = function(){
    let user = this;
    let access = "auth";
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    user.tokens = user.tokens.concat([{access,token}]);
    
    return user.save().then( ()=> {
        return token; 
    });
};
// UserSchema.pre('save', function(next){
//     let user = this;
//     if(user.isModified('password')){
//         bcrypt.genSalt(10, (err,salt)=>{
//             bcrypt.hash(user.password,salt,(err,hash)=>{
//                 user.password = hash;
//                 next();
//             })
//         });
//     }
//     else{
//         next();
//     }
// });
let User = mongoose.model('User', UserSchema);

module.exports = {User};