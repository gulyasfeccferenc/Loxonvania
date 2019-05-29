const User = require('../models/user');

module.exports = {
  getUser: (req, res) => {
    const email = req.body.email;
    User.findOne({name: email}).then(

      user => {
        user.point += 1000;
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
    // előző állapothoz képest nem nőttek annyival, amennyi nem lehetséges, azaz
    // pontok validálása: továbbiakban nice to have

    // kapok xp, 
    User.findOne({_id: userId}).then( res => {

    });
  }
}
