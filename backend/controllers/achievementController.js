module.exports = {
  achievements: (req, res) => {
    const levels = [
      {id: null, rank: 1, name: 'Kezdő', achievments: [
          {id: null, name: 'Pontduplázó', desc: 'Megduplázza az aktuális pontszámod', level: 3, visible: true, options: 'PONTx2', owned: true}
        ] },
      {id: null, rank: 2, name: 'Haladó', achievments: [
          {id: null, name: 'Ponttriplázó', desc: 'Megháromszorozza az aktuális pontszámod', level: 3, visible: true, options: 'PONTx3', owned: false},
          {id: null, name: 'Fizetett Túlóra', desc: 'Egységeid kétszer több hackpontot ($) termelnek', level: 3, visible: true, options: 'PRODx2', owned: true}
        ] },
      {id: null, rank: 3, name: 'Profi', achievments: [
          {id: null, name: 'Agilitás', desc: 'Plusz 2 pont minden egység pont és tapasztalatgyűjtéséhez', level: 3, visible: true, options: 'XP+2PROD+2', owned: false},
          {id: null, name: '0 kiülés', desc: 'Az XP termelés duplájára emelkedik', level: 3, visible: true, options: 'XPx2', owned: true},
          {id: null, name: 'Teljesítményértékelés', desc: '-1 hackpont ($), +2 tapasztalat', level: 3, visible: true, options: 'PROD-1XP+2', owned: false}
        ] }
    ];
    res.status(200).json({
      message: 'Wow, this is done!',
      levels: levels
    }).pretty = true;
  }
}
