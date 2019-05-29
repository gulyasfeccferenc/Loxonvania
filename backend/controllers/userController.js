const User = require('../models/user');

module.exports = {
  getUser: (req, res) => {
    const email = req.body.email;
    User.findOne({name: email}).then(

      user => {
        res.status(200).json({
          message: 'Here is your user',
          user: user
        });
      },
      error => {
        res.status(500).json({
          message: 'User is not available',
          error: error
        });
      }
    );
  },
  updateUser: (req, res) => {
    const userId = req.body.id;
    const points = req.body.points;
    const xp = req.body.xp;
    // előző állapothoz képest nem nőttek annyival, amennyi nem lehetséges, azaz
    // pontok validálása: továbbiakban nice to have
    // kapok xp,
    console.log("Kapott adatok:");
    console.log(userId, points, xp);
    User.findOne({_id: userId}).then( value => {
      User.updateOne({_id: userId}, { $set: {"point": points, "xp": xp}}).then(resValue => {
        console.log(resValue);
        res.status(200).json({
          message: 'User synced successfully!',
          points: points, // TODO: This could be fixed in a further version, where we check whether the sent point value is valid
          xp: xp
        })
      })
    }, error => {
      console.error('Error while syncing: ', error);
      res.status(404).json({
        message: 'User to sync not found!'
      })
    });
  },
  top10: (req, res) => {
    User.find().sort({"points": -1}).limit(3).then(val => {
      res.status(200).json({
        message: "Behold the Hall of Fames!",
        leaders: val
      })
    }, e => {
      console.warn("hiba");
      console.warn(e);
    })
  }
}
