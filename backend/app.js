const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
/**********************************/
let usr = 'adminUser';
let pw = 'szuperjelszo';

const User = require('./models/user');//mongoose.model('user', {name: String});

const app = express();

// console.log(Users.collection.get(1));
mongoose.connect('mongodb+srv://'+usr+':'+pw+'@cluster0-6eruh.gcp.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log("Connected with usr:"+usr+" to db!");
  })
  .catch((e) => console.log("An error occured: "+e));

app.use(bodyparser.json);
app.use(bodyparser.urlencoded({extended: false}));

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

// app.post('/api/auth/register', () => {});

app.post('/api/auth/register',
  (req, res, next) => {
    const newUser = new User({
      name: req.body.name,
      company: req.body.company,
      point: 0,
      avatar: '',
      level: 0
    });
    console.log(newUser);
    res.status(201).json({
      message: 'Company created!'
    });
});

//Handling units here
app.use('/api/units',
  (req, res, next) => {
    const units = [
      {name: 'Milán', produce: 10},
      {name: 'Milcsi', produce: 100},
      {name: 'Milcsi', produce: 100},
      {name: 'Milcsi', produce: 100},
      {name: 'Milcsi', produce: 100},
      {name: 'Milcsi', produce: 100},
      {name: 'Milos', produce: 250},
      {name: 'Milos', produce: 250},
      {name: 'Milos', produce: 250},
      {name: 'Milos', produce: 250},
      {name: 'Oidipus Milos', produce: 1000}
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      units: units
    });
  }
);

//Handling achievments here
app.use('/api/achievments',
  (req, res, next) => {
    const levels = [
      {id: null, rank: 1, name: 'Kezdő', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Ponttriplázó', desc: 'x3', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Túlóra', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Pontquatrózó', desc: 'x4', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '0 kiülés', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 4, name: 'Kiülőmester', achievments: [
          {id: null, name: 'Pontötszöröző', desc: 'x5', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max kiülés', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      levels: levels
    }).pretty = true;

  }
);

module.exports = app;
