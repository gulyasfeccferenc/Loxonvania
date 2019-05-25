module.exports = {
  achievements: (req, res) => {
    const levels = [
      {id: null, rank: 1, name: 'Kezdő', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Ponttriplázó', desc: 'x3', level: 3, visible: true, options: 'PONTx2', owned: false},
          {id: null, name: 'Túlóra', desc: 'x2', level: 3, visible: true, options: 'PONTx2', owned: true}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Pontquatrózó', desc: 'x4', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '0 kiülés', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: false, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] },
      {id: null, rank: 4, name: 'Kiülőmester', achievments: [
          {id: null, name: 'Pontötszöröző', desc: 'x5', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: 'Max kiülés', desc: 'x2', level: 3, visible: true, options: 'PONTx2'},
          {id: null, name: '$$$$$$ PROFIT', desc: 'x2', level: 3, visible: true, options: 'PONTx2'}
        ] }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      levels: levels
    }).pretty = true;
  }
}
