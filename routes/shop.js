const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop');
});

router.get('/:category')

router.get('/:category/create')

router.get('/:category/update')

router.get('/:category/delete')

router.get('/:category/:id')

module.exports = router;
