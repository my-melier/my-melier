const router = require('express').Router();
module.exports = router;

console.log('in index.js API');
router.use('/wine', require('./wine'));
