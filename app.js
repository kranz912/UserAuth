const dbclient = require('./DataAccessLayer/dbclient');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, '0.0.0.0', ()=>{
    console.log('server starting');
    dbclient.connect();
    console.log('server started');
});

app.post('/api/User',(request,response)=>{
    dbclient.addUser(request.body)
    .then((result)=>{
        response.send(result);
    },(err)=>{
        response.send(err);
    })
});
app.post('/api/Auth',(request,response)=>{
    dbclient.isAuthorized(request.body)
    .then((result)=>{
        response.send(result);
    },(err)=>{
        response.send(err);
    });
});
app.post('/api/TokenAuth',(request,response)=>{
    dbclient.validateToken(request.body)
        .then((result)=>{
            response.send(result);
        },(err)=>{
            response.send(err);
        })
});