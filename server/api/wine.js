const router = require('express').Router();
const Wine = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { urlToQueryString } = require('../../utils');
module.exports = router;

router.get('/:title', async (req, res, next) => {
  const titleQuery = urlToQueryString(req.params.title);

  try {
    const wine = await Wine.findAll({
      where: {
        title: {
          [Op.substring]: titleQuery,
        },
      },
    });

    res.json(wine);
  } catch (err) {
    next(err);
  }
});

// let varieties = ['Merlot', 'Cabernet', 'Pinot Noir', 'Chardonnay', 'Malbec'];
// let variety;

// for (let i = 0; i < arr.length; i++) {
//   if (varieties.includes(arr[i])) {
//     variety = arr[i];
//   }
// }
