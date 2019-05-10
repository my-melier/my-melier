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

router.get('/saved/:userId', async (req, res, next) => {
  try {
    const savedWines = await User.findOne({
      where: { id: req.user.id },
      include: { model: Wine },
    });
    res.send(savedWines);
  } catch (err) {
    next(err);
  }
});

router.post('/saved/:userId', async (req, res, next) => {
  try {
    await SavedWine.create(req.body);
    res.send('Sucess!');
  } catch (error) {
    next(error);
  }
});
// let varieties = ['Merlot', 'Cabernet', 'Pinot Noir', 'Chardonnay', 'Malbec'];
// let variety;

// for (let i = 0; i < arr.length; i++) {
//   if (varieties.includes(arr[i])) {
//     variety = arr[i];
//   }
// }
