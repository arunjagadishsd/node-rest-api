const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db');

const {Todo,User} = require('./models');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let {text} = req.body;

    let todo = new Todo({text});
    todo.save().then(doc => res.send(doc)).catch(e => res.status(400).send(e));
});

app.get('/todos',(req,res)=>{
    Todo.find().then(todos=>{
        res.send({todos})
    }).catch(e=>res.send({error}));
});

app.listen(3000, () => {
    console.log('Server Started At 3000');
});

module.exports = {app};