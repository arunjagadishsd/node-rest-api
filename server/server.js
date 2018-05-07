const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db');
const { ObjectID } = require('mongodb');

const {Todo,User} = require('./models');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let {text} = req.body;

    let todo = new Todo({text});
    todo.save().then(doc => res.send(doc)).catch(e => res.status(400).send(e));
});

app.get('/todos',(req,res)=>{
    Todo.find().then(todos=>{
        res.send({todos});
    }).catch(error=>res.send({error}));
});

app.get('/todos/:id', (req, res) => {
    let {id} = req.params;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then(todo => {
        if (!todo){
            return res.status(404).send();
        }
        return res.send({ todo });
    }).catch(error => res.send({ error }));
});

app.listen(port, () => {
    console.log(`Server Started At ${port}`);
});

module.exports = {app};