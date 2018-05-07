const {
    MongoClient,
    ObjectID
} = require('mongodb');

// To Connect To MongoDB
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        // To throw Error
        return console.log('Unable to conect to MongoDB server', err);
    }
    console.log('Connected To Server');
    // To Create New DB 
    const db = client.db('TodosApp');

    // To Fetch All The Data In The MongoDB
    db.collection('Todos').find().toArray()
        .then(docs => console.log(JSON.stringify(docs, null, 2)))
        .catch(err => console.log('error Occured', err));

    // To Fetch And Query The Data In The MongoDB
    db.collection('Todos').find({
            completed: false
        }).toArray()
        .then(docs => console.log(JSON.stringify(docs, null, 2)))
        .catch(err => console.log('error Occured', err));

    // To Query With id From the mongoDB
    db.collection('Todos').find({
            _id: new ObjectID('5aede71a44e3bee3acfef361')
        }).toArray()
        .then(docs => console.log(JSON.stringify(docs, null, 2)))
        .catch(err => console.log('error Occured', err));

    // To close the db after everything's over.
    client.close();
});