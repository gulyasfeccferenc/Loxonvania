const Achievement = require('../models/achievment');
const Level = require('../models/level');
const User = require('../models/user');
const mongoose = require('mongoose');
var util = require('util');

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
  achievements: async function(req, res) {
    const userId = req.body.id;
    // console.log('userid: ' + userId);

    if(userId != null) {
      var userresult = await User.findOne({_id: userId}).catch(e =>{
        log.error('await User find error');
      });
      // mindig a level + 2. achi kell
      var lessThanLevel = userresult.level + 2;

      var levelObjects = [];
      var levels = await Level.find({rank: {$lt: lessThanLevel}}).catch(e =>{
        log.error('await level find error');
      });
      for (var i = 0; i < levels.length; i++) {
        var iLevelAchievements = [];

        for (var j = 0; j < levels[i].achievments.length; j++) {
          console.log('level i j ');
          const achi = await Achievement.findOne({/*owner: userId,*/ _id: levels[i].achievments[j]}).catch(e => {
            log.error('await Achievement findOne error');
          });
          achi.visible = true;
          if (achi.owners.includes(userId)) {
            achi.owned = true;
          }
          iLevelAchievements.push(achi);
        } // end for j

        levels[i].achievments = iLevelAchievements;

      } // end for i

      res.status(200).json({
        message: 'Here are your achievements!',
        levels: levels // levelObjects
      }).pretty = true;
    } else {
      console.error('AchievementController User hiba van. Nincs userId!');
      res.status(500).json({
        message: 'Here are your none ach!',
        levels: levels
      }).pretty = true;
    }

  } // end of achievements
  ,
  buyAchievement: (req, response) => {
    // add achievement to owned
    
    // increase user level based on the achievement level
  }
  ,
  createDataStructure: async (req, res) => {
    // to reset achievements
    /*if(1 < 2) {
      Achievement.collection.dropIndexes(function (err, results) {
        console.error('a drop ind err');
      });
      Level.collection.dropIndexes(function (err, results) {
        console.error('l drop ind err');
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
    await Achievement.deleteMany({}).then( r => {
      console.log('removed all achievements: ' + JSON.stringify(r));
    }).catch( e => {
      console.log('all delete from achievement failed: ' + e);
      errs.push('all delete from achievement failed: ' + e);
    });

    await Level.deleteMany({}).then( r => {
      console.log('removed all levels: ' + JSON.stringify(r));
    }).catch( e => {
      console.log('all delete from level failed: ' + e);
      errs.push('all delete from level failed: ' + e);
    });




    // level 1 related achievements

    const achi1_1 = new Achievement({
      name: 'Pontduplázó', desc: 'Megduplázza az aktuális pontszámod', price: 1000, level: 3, visible: false, options: 'PONTx2', owned: false, owners: ['5cebc4357e03d42c84985335']
    });
    var err = saveData(achi1_1, 'achi');
    if(err) {
      errs.push(err);
    }

    const level1 = new Level({
      rank: 1, name: 'Kezdő', achievments: [achi1_1._id]
    });
    var err = saveData(level1, 'level');
    if(err) {
      errs.push(err);
    }

    // *****************************************************************************************************************
    // level 2 related achievements
    const achi2_1 = new Achievement({
      name: 'Ponttriplázó', desc: 'Megháromszorozza az aktuális pontszámod', price: 1000, level: 3, visible: false, options: 'PONTx3', owned: false, owners: []
    });
    var err = saveData(achi2_1, 'achi');
    if(err) {
      errs.push(err);
    }

    const achi2_2 = new Achievement({
      name: 'Fizetett Túlóra', desc: 'Egységeid kétszer több hackpontot ($) termelnek', price: 1000, level: 3, visible: false, options: 'PRODx2', owned: false, owners: []
    });
    var err = saveData(achi2_2, 'achi');
    if(err) {
      errs.push(err);
    }

    const level2 = new Level({
      rank: 2, name: 'Haladó', achievments: [achi2_1._id, achi2_2._id]
    });
    var err = saveData(level2, 'level');
    if(err) {
      errs.push(err);
    }

    // *****************************************************************************************************************
    // level 3 related achievements
    const achi3_1 = new Achievement({
      name: 'Agilitás', desc: 'Plusz 2 pont minden egység pont és tapasztalatgyűjtéséhez', price: 1000, level: 3, visible: false, options: 'XP+2;PROD+2', owned: false, owners: []
    });
    var err = saveData(achi3_1, 'achi');
    if(err) {
      errs.push(err);
    }

    const achi3_2 = new Achievement({
      name: '0 kiülés', desc: 'Az XP termelés duplájára emelkedik', price: 1000, level: 3, visible: false, options: 'XPx2', owned: false, owners: []
    });
    var err = saveData(achi3_2, 'achi');
    if(err) {
      errs.push(err);
    }

    const achi3_3 = new Achievement({
      name: 'Teljesítményértékelés', desc: '-1 hackpont ($), +2 tapasztalat', price: 1000, level: 3, visible: false, options: 'PROD-1;XP+2', owned: false, owners: []
    });
    var err = saveData(achi3_3, 'achi');
    if(err) {
      errs.push(err);
    }

    const level3 = new Level({
      rank: 3, name: 'Profi', achievments: [achi3_1._id, achi3_2._id, achi3_3._id]
    });
    var err = saveData(level3, 'level');
    if(err) {
      errs.push(err);
    }


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
