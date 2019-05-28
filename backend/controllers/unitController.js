var faker = require('faker');
const Unit = require('../models/worker');
const User = require('../models/user');

function genUnit(userId) {
  //TODO felhasznalni a powerupok erejet!!!
  const type = Math.floor(Math.random() * 2) + 1; // 1 or 2
  const prods = [10, 2][type-1]; // calculate based on the type
  const xp =    [1, 10][type-1]; // calculate based on the type

  return new Unit({
    id: '',
    name: faker.name.findName(), // 'Józsi',
    sprite: faker.image.avatar(), // faker.image.avatar,
    description: faker.hacker.phrase(), // 'A legjobb munkaerő',
    joined: new Date(),
    active: true,
    level: 0,
    type: type, //2,
    produce: prods,
    xp: xp,
    owner: userId
  });
}

module.exports = {

  list: (req, res) => {
    //select units from mongodb based on the userId
    userId = req.body.id; // normal use: req.body.id; // for testing with postman: req.query.id;

    console.error('LIST');
    console.warn(req.body);
    console.warn(userId);
    const currentUser = null;

    if(userId != null) {
      console.warn("NASDFKLAKJSDÉFKJAD");

      User.findOne({_id: userId}).then(queriedUser => {
        currentUser = queriedUser;
      }).catch( error => {
        console.log(error);
      });
      Unit.find({owner: currentUser}).then(
        units => {
          console.log("UNITOK");
          console.log(units);
          if (units.length > 0) {
            res.status(200).json({
              message: 'Ahoy, retrieved all your beloved units.!',
              units: units
            });
          } else if (userId) {
            const starter = genUnit();

            starter.save().then(result => {
              res.status(200).json({
                message: 'Behold your new basic unit!',
                units: [starter],
              });
            }).catch(error => {
              res.status(500).json({
                message: 'Unit couldn\'t be created!',
                error: error
              });
            });
          } else {
            res.status(500).json({
              message: 'Invalid id, no unit created for you, dear hakkor!'
            });
          }
        },
        error => {
          return res.status(444).json({
            message: 'Query error: Units not found: ' + error
          });
        }
      );
    } else {
      return res.status(404).json({
        message: 'No userId found'
      })
    }
  } // end of list
  ,
  generate: (req, res) => {
    userId = req.body.id; // req.body.id;

    const generatedUnit = genUnit(userId);
    console.warn("REQUEST BODY:");
    console.warn(req.body);
    console.warn(generatedUnit);
    console.error(userId);
    generatedUnit.save().then(result => {
      res.status(200).json({
        message: 'Behold your new unit!',
        unit: generatedUnit,
      });
    }).catch(error => {
      res.status(500).json({
        message: 'Unit couldn\'t be created!',
        error: error
      });
    });


  } // end of generate
  ,
  update: (req, res) => {
    const id = req.body.id;
    res.status(200).json(
      {
        message: 'Updated ' + id
      }
    );
  } // end of update
  ,
  fire: (req, res) => {
    const id = req.body.id;
    Unit.remove( {_id: id} ).then(
      r => {
        return res.status(401).json({
          message: 'removed',
        });
      },
      error => {
        message: 'Error during firing a unit: ' + error
      }
    );

    res.status(200).json(
      { message: 'Fired'}
    );
  } // end of destroy
  ,
  lift: (req, res) => {
    const id = req.body.id;
    res.status(200).json(
      { message: 'Lifted ' }
    );
  }

}
