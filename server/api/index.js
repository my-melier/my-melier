const router = require('express').Router();
module.exports = router;

router.use('/wine', require('./wine'));
