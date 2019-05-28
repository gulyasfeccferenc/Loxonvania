var faker = require('faker');
const Unit = require('../models/worker');

function genUnit() {
  //TODO felhasznalni a powerupok erejet!!!
  const type = Math.floor(Math.random() * 2) + 1; // 1 or 2
  const prods = [10, 2][type-1]; // calculate based on the type
  const xp =    [1, 10][type-1]; // calculate based on the type

  return new Unit({
    id: '',
    name: faker.name.findName(), // 'Józsi',
    sprite: faker.image.avatar, // faker.image.avatar,
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

    if(2>1) {
      const starter = genUnit();
      res.status(200).json({
        message: 'Behold your new basic unit!',
        unit: [starter],
      });
    } else {
      Unit.find({owner: userId}).then(
        units => {
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
                unit: [starter],
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
        }
        ,
        error => {
          return res.status(444).json({
            message: 'Query error: Units not found: ' + error
          });
        }
      );
    }
  } // end of list
  ,
  generate: (req, res) => {
    userId = req.query.id; // req.body.id;

    const generatedUnit = genUnit();
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
