const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Request-With, Content-Type, Accept");
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});


//Handling units here
app.use('/api/units',
  (req, res, next) => {
    const units = [
      {name: 'Milán', produce: 10},
      {name: 'Milcsi', produce: 100},
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
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max termelékenység', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max termelékenység', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max termelékenység', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 4, name: 'Kiülőmester', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max termelékenység', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      levels: levels
    }).pretty = true;

  }
);

module.exports = app;
