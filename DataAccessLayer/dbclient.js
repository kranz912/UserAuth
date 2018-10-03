const MongoDbClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server;
const assert =  require('assert');

const url = 'mongodb://localhost:27017';

const database = 'UserAuth';

//var client =  new MongoDbClient(new Server('localhost',27017));
var _db;

module.exports = {
    connect:connect,
    addUser: addUser,
    close: close
    
}

function connect(){
  MongoDbClient.connect(url,{ useNewUrlParser: true },(err,mongoclient)=>{
   assert.equal(null,err);
    _db = mongoclient.db(database);
    console.log('connected to db');
    createCollection(_db);

  });
}

function addUser(user){
    return _db.collection('Users').insertOne(user);
}
function close(){
    MongoDbClient.close();
}
function createCollection(db){
    db.createCollection('Users',{
        validator: {$jsonSchema:{
            bsonType: "object",
            required: ['Username','Password'],
            properties: {
                Username: {
                    bsonType: "string",
                    description: "Username is required"
                },
                Password: {
                    bsonType: "string",
                    description: "Password is required"
                }
            }
        }},
        validationLevel: 'strict',
        validationAction: 'error'
    });
}
