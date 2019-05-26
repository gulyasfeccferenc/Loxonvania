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
    const generatedUnit = {
      name: 'Józsi',
      sprite: '',
      description: 'A legjobb munkaerő',
      joined: new Date(),
      active: true,
      level: 0,
      type: 2,
      produce: 2,
      xp: 10
      //owner: currentUser
    };
    res.status(200).json({
      message: 'Behold your new unit!',
      unit: generatedUnit
    });
  } // end of generate

}
