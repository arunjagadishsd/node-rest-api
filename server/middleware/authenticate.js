const {User} = require('../models');

let authenticate = (req,res,next)=> {
    let token = req.header['x-auth'];

    User.findByToken(req.token);
    
};