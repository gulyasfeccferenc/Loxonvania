var faker = require('faker');

module.exports = {

  list: (req, res) => {
    const units = [
      {
        name: 'Steve Jobs',
        sprite: '',
        description: 'Elsőszámú fejlesztő',
        joined: new Date(),
        active: true,
        level: 0,
        type: 1,
        produce: 10,
        xp: 1
        //owner: currentUser
      }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      units: units
    });
  } // end of list
  ,
  generate: (req, res) => {

    //TODO felhasznalni a powerupok erejet!!!
    const type = Math.floor(Math.random() * 2) + 1; // 1 or 2
    const prods = [10, 2][type-1]; // calculate based on the type
    const xp =    [1, 10][type-1]; // calculate based on the type

    const generatedUnit = {
      id: '', //TODO user id
      name: faker.name.findName(), // 'Józsi',
      sprite: faker.image.avatar, // faker.image.avatar,
      description: faker.hacker.phrase(), // 'A legjobb munkaerő',
      joined: new Date(),
      active: true,
      level: 0,
      type: type, //2,
      produce: prods,
      xp: xp
      //owner: currentUser
    };

    //get user
    // save id to user

    // save the unit
    usedid = req.body.email;

    res.status(200).json({
      message: 'Behold your new unit!',
      unit: generatedUnit
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
    console.log(req);
    res.status(200).json(
      { message: 'Fired'}
    );
  } // end of destroy
  ,
  lift: (req, res) => {
    res.status(200).json(
      { message: 'Lifted ' }
    );
  }

}
