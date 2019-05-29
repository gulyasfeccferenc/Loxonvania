const Achievement = require('../models/achievment');
const Level = require('../models/level');
const User = require('../models/user');
const mongoose = require('mongoose');

function saveData(achi, type) {
  var err = '';
  achi.save().then(result => {
    console.log(type + ' saved:' + achi._id);
  }).catch(error => {
    console.log(type + ' save failed:' + achi.name + ' Error: ' + error);
    err = type + ' save failed:' + achi.name + ' Error: ' + error;
  });
  return err;
}

module.exports = {
  achievements: (req, res) => {
    //get user to list achievements and find the available achievements based on the level of the user (max level of the owned achievements)

    // mindig a level + 1. achi kell
    const userId = req.body.id;
    console.log('userid: ' + userId);

    const user = User.find({_id: userId});
    console.log('USERRR: ' + user.level);

    Level.find();
    Achievement.find({owner: userId}).then( result =>{
      res.status(200).json({
        message: 'Here are you achievements!',
        levels: []
      });
    }).catch(e => {

    });


    /*const levels = [
      {id: null, rank: 1, name: 'Kezdő', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'Megduplázza az aktuális pontszámod', level: 3, visible: true, options: 'PONTx2', owned: true}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Ponttriplázó', desc: 'Megháromszorozza az aktuális pontszámod', level: 3, visible: true, options: 'PONTx3', owned: false},
          {id: null, name: 'Fizetett Túlóra', desc: 'Egységeid kétszer több hackpontot ($) termelnek', level: 3, visible: true, options: 'PRODx2', owned: true}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Agilitás', desc: 'Plusz 2 pont minden egység pont és tapasztalatgyűjtéséhez', level: 3, visible: true, options: 'XP+2PROD+2', owned: false},
          {id: null, name: '0 kiülés', desc: 'Az XP termelés duplájára emelkedik', level: 3, visible: true, options: 'XPx2', owned: true},
          {id: null, name: 'Teljesítményértékelés', desc: '-1 hackpont ($), +2 tapasztalat', level: 3, visible: true, options: 'PROD-1XP+2', owned: false}
        ] }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      levels: levels
    }).pretty = true;*/
  }
  ,
  createDataStructure: (req, res) => {
    /*if(1 < 2) {
      Achievement.collection.dropIndexes(function (err, results) {
        log.error('a drop ind err');
      });
      Level.collection.dropIndexes(function (err, results) {
        log.error('l drop ind err');
      });
      mongoose.deleteModel('Achievment');
      mongoose.deleteModel('Level');
      return res.status(200).json({
        message: 'Removed schema Achievment',
      }).pretty = true;
    }
*/

/*

    if(1<2) {
      Achievement.find({}).then(r => {
        return res.status(200).json({
          message: 'Here ara all achi',
          ach: r
        }).pretty = true;
      }).catch(e => {
        return res.status(500).json({
          message: 'Error achi',
        }).pretty = true;
      });
      return;
    }
*/
    errs = [];

    //* before creating new structure, empty the old collections
    Achievement.deleteMany({}).then( r => {
      console.log('removed all achievements: ' + JSON.stringify(r));
    }).catch( e => {
      console.log('all delete from achievement failed: ' + e);
      errs.push('all delete from achievement failed: ' + e);
    });

    Level.deleteMany({}).then( r => {
      console.log('removed all levels: ' + JSON.stringify(r));
    }).catch( e => {
      console.log('all delete from level failed: ' + e);
      errs.push('all delete from level failed: ' + e);
    });




    // level 1 related achievements

    const achi1_1 = new Achievement({
      name: 'Pontduplázó', desc: 'Megduplázza az aktuális pontszámod', price: 1000, level: 3, visible: false, options: 'PONTx2', owners: []
    });
    errs.push(saveData(achi1_1, 'achi'));

    const level1 = new Level({
      rank: 1, name: 'Kezdő', achievments: [achi1_1._id]
    });
    errs.push(saveData(level1, 'level'));

    // *****************************************************************************************************************
    // level 2 related achievements
    const achi2_1 = new Achievement({
      name: 'Ponttriplázó', desc: 'Megháromszorozza az aktuális pontszámod', price: 1000, level: 3, visible: false, options: 'PONTx3', owners: []
    });
    errs.push(saveData(achi2_1, 'achi'));

    const achi2_2 = new Achievement({
      name: 'Fizetett Túlóra', desc: 'Egységeid kétszer több hackpontot ($) termelnek', price: 1000, level: 3, visible: false, options: 'PRODx2', owners: []
    });
    errs.push(saveData(achi2_2, 'achi'));

    const level2 = new Level({
      rank: 2, name: 'Haladó', achievments: [achi2_1._id, achi2_2._id]
    });
    errs.push(saveData(level2, 'level'));

    // *****************************************************************************************************************
    // level 3 related achievements
    const achi3_1 = new Achievement({
      name: 'Agilitás', desc: 'Plusz 2 pont minden egység pont és tapasztalatgyűjtéséhez', price: 1000, level: 3, visible: false, options: 'XP+2;PROD+2', owners: []
    });
    errs.push(saveData(achi3_1, 'achi'));

    const achi3_2 = new Achievement({
      name: '0 kiülés', desc: 'Az XP termelés duplájára emelkedik', price: 1000, level: 3, visible: false, options: 'XPx2', owners: []
    });
    errs.push(saveData(achi3_2, 'achi'));

    const achi3_3 = new Achievement({
      name: 'Teljesítményértékelés', desc: '-1 hackpont ($), +2 tapasztalat', price: 1000, level: 3, visible: false, options: 'PROD-1;XP+2', owners: []
    });
    errs.push(saveData(achi3_3, 'achi'));

    const level3 = new Level({
      rank: 3, name: 'Profi', achievments: [achi3_1._id, achi3_2._id, achi3_3._id]
    });
    errs.push(saveData(level3, 'level'));
    console.log('ERRRRRRRRRRRRRRRRRRRRRRS');
    console.log(errs);

    if(errs.length > 0) {
      res.status(200).json({
        message: 'Error during achievement save',
        errors: errs
      }).pretty = true;
    } else {
      res.status(200).json({
        message: 'Saved Achievements.',
      }).pretty = true;
    }

  }
}
