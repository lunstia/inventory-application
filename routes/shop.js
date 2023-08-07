const categoryController = require('../controllers/categoryController')
const Category = require('../models/category')

const express = require('express');
const router = express.Router();

// Shop's home page
router.get('/', async function(req, res, next) {
  const categories = await Category.find().exec()

  if (categories[0]) {
    res.redirect(`/shop/${categories[0].category}`);
  } else {
    next(new Error("ERROR: No categories"))
  }
});

// Controller routes
router.get('/:category', categoryController.category_read);

router.post('/create', categoryController.category_create);

router.post('/:category/update', categoryController.category_update);

router.post('/:category/delete', categoryController.category_delete);

router.get('/:category/:id');

router.post('/:category/create');

router.put('/:category/:id/update')

router.delete('/:category/:id/delete')

module.exports = router;
