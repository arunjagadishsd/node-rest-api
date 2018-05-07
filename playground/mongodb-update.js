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
    // To Create New DB Or Connecting To Exisitng DB
    const db = client.db('TodosApp');
    // To Update A Existing Data Into A Collection
    db.collection('Todos').findOneAndUpdate({
            _id: new ObjectID('5aee963566eeb4034116edf0')
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        })
        .then(res => console.log(res)).catch(err => console.log(err));

    // To udpate using INC
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aee92c61b9d6c81ac27e72d')
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(res => console.log(res)).catch(err => console.log(err));


    // To close the db after everything's over.
    client.close();
});