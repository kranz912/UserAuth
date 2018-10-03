const MongoDbClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server;
const assert =  require('assert');

const url = 'mongodb://localhost:27017';

const database = 'UserAuth';

//var client =  new MongoDbClient(new Server('localhost',27017));
var _db;

module.exports = {
    connect:connect,
    getDatabase: getDatabase,
    close: close
    
}

function connect(){
  MongoDbClient.connect(url,{ useNewUrlParser: true },(err,mongoclient)=>{
   assert.equal(null,err);
    _db = mongoclient.db(database);
  });
}

function getDatabase(){
    return _db;
}
function close(){
    MongoDbClient.close();
}
