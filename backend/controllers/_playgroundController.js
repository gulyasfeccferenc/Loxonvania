const Achievment = require('../models/achievment');
const Level = require('../models/level');
const User = require('../models/user');
const Unit = require('../models/worker');

module.exports = {

  play: (req, res) => {
    console.log('PLAY');
    /*User.find({}).then( user =>
      {
        return res.status(401).json({
          message: 'got user: ' + user
        });
      }
      , error => {
        return res.status(444).json({
          message: 'not got user: ' + error
        });
      }
    );
    */

    Unit.remove({}).then(
      r => {
        return res.status(401).json({
          message: 'removed',
        });
      },
      error => {
        message: 'error remove: ' + error
      }
    );


    /*Unit.find({}).then( unit =>
      {
        return res.status(401).json({
          message: 'got unit: ',
          units: unit
        });
      }
      , error => {
        return res.status(444).json({
          message: 'not got unit: ' + error
        });
      }
    );*/


    /*
    User.findOne( {
      name: 'tamas.enyedi@loxon.eu' //req.body.email //TODO: Check for company not null
    }).then(user => {
        return res.status(401).json({
          message: 'got user: ' + user
        });
      }, error => {
        return res.status(444).json({
          message: 'not got user: ' + user
        });
    });

     */

    /*const achievment = new Achievment({
      id: 1,
      name: 'FirstAchievment',
      desc: 'This is the first achievment',
      level: '0',
      visible: true,
      owned: false,
      options: 'x666',
    });

    achievment.save().then(result => {
      res.status(201).json({
        message: 'Achievment created!' + achievment,
        result: result
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Achievment couldn\'t be created!',
        error: error
      });
    });
*/
    // res.send('Gunar world');
  } // end of play
  ,
  selectAchievment: (req, res) => {
    Achievment
      .find({name: 'FirstAchievment'})
      .then(
        ach => {
          res.status(200).json({
            message: 'Found achievment: ' + ach[0]
          });
        },
        error => {
          res.status(500).json({
            message: 'Not found achievment.'
          });
        }
      );
  } // end of selectAchievment
  ,


}
