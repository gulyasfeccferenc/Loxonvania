const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/**********************************/

/*
let usr = 'adminUser';
let pw = 'szuperjelszo';
let feccUrl = '@cluster0-6eruh.gcp.mongodb.net/test?retryWrites=true';
*/

/* Allow from everywhere added to this cluster*/
let usr = 'loxonvania';
let pw = 'loxon666';
let dbConnString = '@loxonvaniacluster-lebqy.mongodb.net/test?retryWrites=true';

const User = require('./models/user');//mongoose.model('user', {name: String});

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// console.log(Users.collection.get(1));
mongoose.connect('mongodb+srv://' + usr + ':' + pw + dbConnString, { useNewUrlParser: true, useCreateIndex: true } )
  .then(() => {
    console.log("Connected with usr:"+usr+" to db!");
  })
  .catch((e) => console.log("An error occured: "+e));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization');
    // "Access-Control-Request-Headers, Origin, X-Request-With, Content-Type, Accept");
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS, HEAD');
  next();
});

// routing
var routes = require('./routes');
app.use('/api', routes);

// app.post('/api/auth/register', () => {});

module.exports = app;
