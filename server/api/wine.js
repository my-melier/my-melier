const router = require('express').Router();
const Wine = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    console.log('DB Wine', Wine);
    const wine = await Wine.findByPk(9);
    console.log(wine);
    res.json(wine);
  } catch (err) {
    next(err);
  }
});
