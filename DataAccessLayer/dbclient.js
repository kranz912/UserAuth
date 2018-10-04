const MongoDbClient = require('mongodb').MongoClient
    , assert =  require('assert')
    , validation = require('../Helpers/Validation/Validation')
    , crypto = require('crypto');
const url = 'mongodb://artn:mongo012mh@ds223343.mlab.com:23343/userauth';
const database = 'userauth';

const secret ='asjdi81j2m3109jmoazsdasidajn12934u123lkasdasd91u2391u2039123123';

var _db;

module.exports = {
    connect:connect,
    addUser: addUser,
    isAuthorized, isAuthorized,
    validateToken, validateToken,
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

function close(){
    MongoDbClient.close();
}
function encrypt(str){
    return crypto.createHash('sha256',secret)
            .update(str)
            .digest('hex');
}

function addUser(user){
    return new Promise((resolve,reject)=>{
        if(!validation.UsernameIsValid(user.Username)){
            reject('Invalid Username');
        }
        if(!validation.PasswordIsValid(user.Password)){
            reject('Password does not meet the requirements');
        }
        _db.collection('Users').findOne({Username:user.Username},(err,result)=>{
            if(result==null){
                user.Password = encrypt(user.Password);
                _db.collection('Users').insertOne(user).then((result)=>{
                    resolve(result);
                },(err)=>{
                    reject(err);
                });
            }
            else{
                reject('User already exist');
            }
        });
    });
}
function isAuthorized(user){
    return new Promise((resolve,reject)=>{
        user.Password = encrypt(user.Password);
        _db.collection('Users').findOne({Username:user.Username, Password: user.Password},(err,result)=>{
            if(result!=null){
                var datetime = Date.now();
                var token = createToken(user.Username,datetime);
           
                _db.collection('Token').insertOne({Username:user.Username, Token:token, timestamp: datetime})
                    .then((result)=>{
                       
                        resolve({token : token});
                    });
            }
            else{
                reject('Authentication Error');
            }
        });
    });
}
function isValidToken(tokentime, timenow){
    console.log(tokentime);
    console.log((timenow- tokentime));
    return Math.floor((timenow- tokentime)/60000) <60;
}
function validateToken(token){
    return new Promise((resolve,reject)=>{

        _db.collection('Token').findOne({Token:token.token},(err,result)=>{
            if(result!=null){
                if(isValidToken(result.timestamp,Date.now())){
                    resolve(result.Username);
                }
                else{
                    reject('Token Expired')
                }
            }
            else{
                reject('Token Expired');
            }
        });
    });
}

function createToken(username,datetime){
    var hash =crypto.createHash('sha256',secret)
        .update(username+datetime)
        .digest('hex');
    return hash;
}

function createCollection(db){
    db.createCollection('Users',{
        validator: {
            $jsonSchema:{
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
            }
        },
        validationLevel: 'strict',
        validationAction: 'error'
    });
    db.createCollection('Token',{
        validator:{
            $jsonSchema:{
                bsonType: "object",
                properties:{
                    Username:{
                        bsonType: "string"
                    },
                    Token:{
                        bsonType: "string"
                    },
                    timestamp:{
                        bsonType: "long"
                    }
                }
            }
        }
    });
}
