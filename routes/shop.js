const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop');
});

router.get('/:category');

router.post('/create');

router.put('/:category/update');

router.delete('/:category/delete');

router.get('/:category/:id');

router.post('/:category/create');

router.put('/:category/:id/update')

router.delete('/:category/:id/delete')

module.exports = router;
