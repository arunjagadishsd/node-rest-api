const {
    MongoClient
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

    client.close();
});