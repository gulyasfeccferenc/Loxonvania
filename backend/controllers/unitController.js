module.exports = {

  list: (req, res) => {
    const units = [
      {name: 'Milán', produce: 10, active: true}
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
      produce: 2
      //owner: currentUser
    };
    res.status(200).json({
      message: 'Behold your new unit!',
      unit: generatedUnit
    });
  } // end of generate

}
