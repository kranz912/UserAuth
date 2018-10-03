const dbclient = require('./DataAccessLayer/dbclient');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, '0.0.0.0', function(){
    console.log('server starting');
    dbclient.connect();
    console.log('server started');
});

app.post('/api/User',function(request,response){
    console.log(request.body);
    dbclient.addUser(request.body)
    .then((resp)=>{
        response.send(resp.errmsg);
    })
    .catch((err)=>{
        response.send(err);
    });

});