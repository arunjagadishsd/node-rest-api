const {mongoose} = require('../server/db');
const {Todo,User} = require('../server/models'); 

const _id = '5aefeea79dba657da80c92fb';

Todo.find({_id}).then(todos=>console.log(todos));

Todo.findOne({ completed:false }).then(todo => console.log(todo));

Todo.findById(_id).then(todo => console.log(todo));

User.find({ _id }).then(users => console.log(users));

