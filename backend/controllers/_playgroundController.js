const Achievment = require('../models/achievment');
const Level = require('../models/level');

module.exports = {

  play: (req, res) => {
    const achievment = new Achievment({
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
