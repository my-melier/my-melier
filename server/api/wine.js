const router = require('express').Router();
const Wine = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = router;

router.get('/:title', async (req, res, next) => {
  const words = req.params.title.split('_');
  console.log('WORDS', words);
  try {
    const wine = await Wine.findAll({
      where: {
        title: {
          // [Op.substring]: req.params.title,
          // [Op.contains]: words,
          [Op.and]: [
            { [Op.substring]: 'Rombauer' },
            { [Op.substring]: 'Chardonnay' },
            { [Op.substring]: '1' },
          ],
          // [Op.substring]: 'Educated',
          // [Op.substring]: 'Cabernet',
          // [Op.substring]: '15',
          // [Op.substring]: 'Napa',
        },
      },
    });
    res.json(wine);
  } catch (err) {
    next(err);
  }
});
