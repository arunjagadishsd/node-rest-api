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

app.delete('/todos/:id', (req, res) => {
    let { id } = req.params;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.send({ todo });
    }).catch(error => res.send({ error }));
});

// To Update a doc
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Server Started At ${port}`);
});

app.listen(port, () => {
    console.log(`Server Started At ${port}`);
});

module.exports = {app};