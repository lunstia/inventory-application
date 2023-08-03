const categoryController = require('../controllers/categoryController')

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shop');
});

router.get('/:category', categoryController.category_read);

router.post('/create', categoryController.category_create);

router.put('/:category/update', categoryController.category_update);

router.delete('/:category/delete', categoryController.category_delete);

router.get('/:category/:id');

router.post('/:category/create');

router.put('/:category/:id/update')

router.delete('/:category/:id/delete')

module.exports = router;
