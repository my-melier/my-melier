const router = require('express').Router();
const Wine = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { urlToWords } = require('../../utils');
module.exports = router;

router.get('/:title', async (req, res, next) => {
  // let varieties = ['Merlot', 'Cabernet', 'Pinot Noir', 'Chardonnay', 'Malbec'];
  // let years = ['2000', '2005'];
  // const arr = req.params.title.split('_').filter(word => word !== '');
  // console.log(arr);
  // let variety;

  // for (let i = 0; i < arr.length; i++) {
  //   if (varieties.includes(arr[i])) {
  //     variety = arr[i];
  //   }
  // }

  try {
    const wine = await Wine.findAll({
      where: {
        title: {
          [Op.substring]: req.params.title,
        },
      },
    });

    res.json(wine);
  } catch (err) {
    next(err);
  }
});

// const wine = await Wine.findAll({
//   where: {
//     winery: ['Domaine Fernand Engel 2016 Pinot Noir Rosé'],

// 'Domaine',
//     'Fernand',
//     'Engel',
//     '2016',
//     'Pinot',
//     'Noir',
//     'Rosé',
// variety: {
//   [Op.in]: 'Domaine Fernand Engel 2016 Pinot Noir Rosé',
// },
// title: {
//   [Op.and]: [
//     { [Op.substring]: 'Domaine' },
//     { [Op.substring]: 'Huët' },
//     { [Op.substring]: 'Clos' },
//     { [Op.substring]: 'du' },
//     { [Op.substring]: 'Bourg' },
//     { [Op.substring]: 'Sec' },
//     { [Op.substring]: 'Vouvray' },
//   ],
// },

// [Op.substring]: 'Educated',
// [Op.substring]: 'Cabernet',
// [Op.substring]: '15',
// [Op.substring]: 'Napa',
// },
// });
