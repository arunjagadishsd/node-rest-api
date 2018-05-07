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

    //To Delete Many Files
    db.collection('Todos').deleteMany({
            text: 'Eat Lunch'
        })
        .then(result => console.log(result))
        .catch(err => console.log('Error Occured', err));

    //To Delete One File
    db.collection('Todos').deleteOne({
            text: 'Eat Lunch'
        })
        .then(result => console.log(result))
        .catch(err => console.log('Error Occured', err));

    //To Delete Many Files 
    db.collection('Todos').findOneAndDelete({
            text: 'Eat Lunch'
        })
        .then(result => console.log(result))
        .catch(err => console.log('Error Occured', err));



    // To close the db after everything's over
    client.close();
});