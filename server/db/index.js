
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://arunjagadishsd:ArunMlabs@ds217350.mlab.com:17350/todosapp');

module.exports = {mongoose};