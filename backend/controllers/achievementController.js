const Achievement = require('../models/achievment');
const Level = require('../models/level');
const User = require('../models/user');
const Unit = require('../models/worker');
const mongoose = require('mongoose');
var util = require('util');


/*
* Achievement uprade effect handling
* */

const sign_mul = '*';
const sign_add = '+';
const sign_sub = '-';

const opt_pont = 'PONT';
const opt_prod = 'PROD';
const opt_xp = 'XP';

// evalOp(544, '*2') => 1088
function evalOp(value, expr) {
  console.log('evalop ' + value + ' ' + expr);
  return eval(value + expr);
}

function getExpr(tn) {
  var sign = '';
  if(tn.includes(sign_mul)) {
    sign = sign_mul;
  }
  else if(tn.includes(sign_add)) {
    sign = sign_add;
  }
  else if(tn.includes(sign_sub)) {
    sign = sign_sub;
  }
  return sign + tn.split(sign)[1];
}

async function activateAchiOptions(userId, option) {
  console.log('Activating for: ', userId, option);
  var typeAndNums = [option];
  if(option && option.includes(';')) {
    typeAndNums = option.split(';');
  }
  console.log('typeAndNums: ' + typeAndNums);
  for(var i = 0; i < typeAndNums.length; i++) {
    var tn = typeAndNums[i];
    var expr = getExpr(tn);
    console.log('ACTIVATOR: ' + tn);
    // user related: PONT
    if(tn.includes(opt_pont)) {
      console.log('PONT activating');
      User.findOne({_id: userId}).then(usr => {
        var points = usr.point;
        console.log('PONT usr: ' + util.inspect(usr));
        console.log('PONT pts: ' + points);
        var upgradedPoints = evalOp(points, expr);

        User.updateOne({_id: userId}, { $set: {"point": upgradedPoints }}).then(resValue => {
          console.log('PONT Achievement upgrade done successfully ', points, upgradedPoints);
        }).catch(e => {
          console.log('buy updateone error: ' + e);
        });
      }).catch(e => {
        console.log('buy Not found user error: ' + e);
      });
    }
    // unit related: PROD, XP
    else if(tn.includes(opt_prod) || tn.includes(opt_xp)) {
      console.log('PROD XP activating ', tn, expr);
      const currentUser = await User.findOne({_id: userId}).catch( error => {
        console.log(error);
      });
      // console.log('PROD XP USER ' + util.inspect(currentUser));
      const units = await Unit.find({owner: currentUser._id}).catch(e => {
        console.log('Unit find error! ' + e);
      });

      console.log('iter units');
      for(var j = 0; j < units.length; j++) {
        var u = units[j];
        if(tn.includes(opt_prod)) {
          console.log('THIS IS PROD');
          var prod = u.produce;
          var newProd = evalOp(prod, expr);
          await Unit.updateOne({_id: u._id}, {$set: {produce: newProd}}).then( resValue => {
            console.log('Unit prod upgrade done successfully!', prod, newProd);
          }).catch(e => {
            console.log('Unit prod upgrade error! ' + e);
          });
        } else if(tn.includes(opt_xp)) {
          console.log('THIS IS XP');
          var xp = u.xp;
          var newXp = evalOp(xp, expr);
          await Unit.updateOne({_id: u._id}, {$set: {xp: newXp}}).then( resValue => {
            console.log('Unit xp upgrade done successfully!', xp, newXp);
          }).catch(e => {
            console.log('Unit xp upgrade error! ' + e);
          });
        }

      }
    }
    console.log('end of for: ' + i);

  } // end of for

}

/********************************************************************************************/


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

async function findLevelsForUser(userId, lessThanLevel) {
  var levels = await Level.find({rank: {$lt: lessThanLevel}}).catch(e =>{
    log.error('await level find error');
  });
  for (var i = 0; i < levels.length; i++) {
    var iLevelAchievements = [];

    for (var j = 0; j < levels[i].achievments.length; j++) {
      //console.log('level i j ');
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
  return levels;
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
      // console.log('lessthan: ' + lessThanLevel);

      var levels = await findLevelsForUser(userId, lessThanLevel);

      //console.log('levels: ' + util.inspect(levels));

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
  buyAchievement: async(req, response) => {
    const userId = req.body.id;
    const achiId = req.body.achiid;

    console.log('buy achi data: ', userId, achiId);

    // add achievement to owned
    const achi = await Achievement.findOne({_id: achiId})
      .catch(e =>{
        console.log('buy achi error: ' + e);
        return res.status(404).json({
          message: 'Buy achievement -  not found!' + e
        });
      });

    User.findOne({_id: userId}).then( async value => {
      const userLevel = value.level;
      const achiLevel = achi.level;
      // check if not bought yet
      if (!achi.owners.includes(userId)) {
        await Achievement.updateOne( {_id: achiId}, {$push: { "owners": userId } } );
        console.log('&&&&&&&&&&&& NOW OWNING ACHI!!!');

        // TODO use achivement immediately, update user and unit related data based on the achivement
        activateAchiOptions(userId, achi.options);
      }
      else if (userLevel < achiLevel) {
        // increase user level based on the achievement level
        console.log('&&&&&&&&&&&& UPDATED USER LEVEL');
        await User.updateOne({_id: userId}, {$set: {"level": achiLevel}}).then(resValue => {
          console.log(resValue);
        })
      } else {
        console.log('kthx..');
      }

      // válaszul az összes levelt visszaadni!
      const levels = await findLevelsForUser(userId, userLevel < achiLevel ? achiLevel : userLevel);
      response.status(200).json({
        message: 'Here are your all levels!',
        levels: levels
      }).pretty = true;

    }).catch( error => {
      console.error('buy Error while syncing: ', error);
      response.status(404).json({
        message: 'User to sync not found!',
        levels: []
      }).pretty = true;
    });


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
      name: 'Ponttriplázó', desc: 'Megháromszorozza az aktuális pontszámod', price: 1000, level: 3, visible: false, options: 'PONT*3', owned: false, owners: []
    });
    var err = saveData(achi2_1, 'achi');
    if(err) {
      errs.push(err);
    }

    const achi2_2 = new Achievement({
      name: 'Fizetett Túlóra', desc: 'Egységeid kétszer több hackpontot ($) termelnek', price: 1000, level: 3, visible: false, options: 'PROD*2', owned: false, owners: []
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
      name: '0 kiülés', desc: 'Az XP termelés duplájára emelkedik', price: 1000, level: 3, visible: false, options: 'XP*2', owned: false, owners: []
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
