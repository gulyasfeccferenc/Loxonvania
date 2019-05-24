const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/**********************************/
let usr = 'adminUser';
let pw = 'szuperjelszo';

const User = require('./models/user');//mongoose.model('user', {name: String});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// console.log(Users.collection.get(1));
mongoose.connect('mongodb+srv://'+usr+':'+pw+'@cluster0-6eruh.gcp.mongodb.net/test?retryWrites=true')
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

// app.post('/api/auth/register', () => {});



app.post('/api/register',
  (req, res, next) => {
    console.log(req.body);
    const newUser = new User({
      name: (req != null && req.body != null && req.body.name != null) ? req.body.name : null,
      company: (req != null && req.body != null && req.body.company != null) ? req.body.company : null,
      point: 0,
      avatar: '',
      level: 0
    });
    console.log(newUser);
    if (newUser.company == null || newUser.name == null) {
      res.status(202).json({
        message: 'Not your arany micikéd'
      });
    } else {
      newUser.save().then(result => {
        res.status(201).json({
          message: 'Company created!',
          result: result
        });
      }).catch(error => {
        res.status(500).json({
          message: 'Company couldn\'t be created!',
          error: error
        });
      });
    }
});

app.post('/login', (req, res, next) => {
  User.findOne( {
    email: req.body.email //TODO: Check for company not null
  }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed!'
      });
    }

  }, error => {

  });
});

//Handling units here
app.use('/api/units/list',
  (req, res, next) => {
    const units = [
      {name: 'Milán', produce: 10, active: true}
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      units: units
    });
  }
);

/**
 * Use this to generate a new unit with random name, avatar, producing value, etc
 * Would be nice if it could have incoming parameters to seed the generation
 */
app.use('/api/units/generate',
  (req, res, next) => {
    const generatedUnit = {
      name: 'Józsi',
      sprite: '',
      description: 'A legjobb munkaerő',
      joined: new Date(),
      active: true,
      level: 0,
      type: 2,
      produce: 2
      //owner: currentUser
    };
  res.status(200).json({
    message: 'Behold your new unit!',
    unit: generatedUnit
  });
});

//Handling achievments here
app.use('/api/achievments',
  (req, res, next) => {
    const levels = [
      {id: null, rank: 1, name: 'Kezdő', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Ponttriplázó', desc: 'x3', level: 3, visible: true, options: 'PONTx2', owned: false},
          {id: null, name: 'Túlóra', desc: 'x2', level: 3, visible: true, options: 'PONTx2', owned: true}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Pontquatrózó', desc: 'x4', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '0 kiülés', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: false, options: 'PONTx2'},
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
