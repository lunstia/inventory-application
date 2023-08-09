const categoryController = require('../controllers/categoryController')
const itemController = require('../controllers/itemController')
const Category = require('../models/category')

const express = require('express');
const router = express.Router();

// Shop's home page
router.get('/', async function(req, res, next) {
  const category = await Category.findOne().exec()

  if (category) {
    res.redirect(`/shop/${category.category}`);
  } else {
    res.render('shop');
  }
});

// Controller routes
router.get('/:category', categoryController.category_read);

router.post('/create', categoryController.category_create);

router.post('/:category/update', categoryController.category_update);

router.post('/:category/delete', categoryController.category_delete);

router.get('/:category/create', itemController.item_create_get);

router.post('/:category/create', itemController.item_create_post);

router.get('/:category/:id', itemController.item_read);

router.get('/:category/:id/update', itemController.item_update_get)

router.post('/:category/:id/update', itemController.item_update_post)

router.post('/:category/:id/delete', itemController.item_delete)

module.exports = router;
