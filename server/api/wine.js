const router = require('express').Router();
const { Wine, SavedWine, User } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = router;

router.get('/:title', async (req, res, next) => {
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

router.get('/:userId', async (req, res, next) => {
  try {
    const wines = await SavedWine.findAll({
      where: { userId: req.user.id },
      include: { model: Wine },
    });
    res.send(wines);
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
