const {MongoClient} = require('mongodb');

// To Connect To MongoDB
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        // To throw Error
        return console.log('Unable to conect to MongoDB server',err);   
    }
    console.log('Connected To Server'); 
    // To Create New DB 
    const db = client.db('TodosApp');
    // To Insert New Data Into A Collection
    
    db.collection('Todos').insertOne({
        text:'Eat Lunch',
        completed: false
        // CallBack Function To Handle Err and to return the value entered.
    },(Err,result)=>{
        if(err){
            return console.log('Unable to insert Todo',err);
        }
        console.log(JSON.stringify(result.ops,null,2));
        
    });
    
    // db.collection('Users').insertOne({
    //     name:'Arun S D',
    //     age : 23,
    //     location : 'Chennai'
    //     // CallBack Function To Handle Err and to return the value entered.
    // },(Err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert Todo',err);
    //     }
    //     // @ops is to get the value inserted from the result
    //     console.log(JSON.stringify(result.ops,null,2));
        
    // });

    // To close the db after everything's over.
    client.close();
});