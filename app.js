const dbclient = require('./DataAccessLayer/dbclient');
const assert = require('assert');
dbclient.connect();
var collection = dbclient.getDatabase('Users');
console.log(collection);
collection.insertOne({Username:'kranz'});
collection.find({}).toArray(function(err,users){
    assert.equal(null,err);
    console.log(users);
});