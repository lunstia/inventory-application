const asyncHandler = require('express-async-handler');
const Category = require('../models/category')
const Item = require('../models/item')
const {body, validationResult} = require('express-validator')

exports.category_read = asyncHandler(async (req, res, next) => {
    const [categories, items] = await Promise.all([
        Category.find({}, "category").exec(),
        Item.find({category: req.params.category}).exec()
    ])
    
    const array = categories.find((category) => category.category === req.params.category)

    if (!array) {
        next();
        return
    }

    res.render('shop', {title: req.params.category, categories: categories, items: items, urlParam: req.params.category})
});

exports.category_create = [
    body('categoryName', "category name must be above 3 characters and not empty")
        .trim()
        .isLength({min: 3, max: 20})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send("error!" + result.toString())
        } else {
            const category = new Category({category: req.body.categoryName})
            await category.save()

            res.redirect(category.url)
        }
        
    })
];

exports.category_update = [
    body('categoryName', "category name must be above 3 characters and not empty")
        .trim()
        .isLength({min: 3, max: 20})
        .escape(),

    asyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        const category = await Category.findOne({category: req.params.category}).exec();
        console.log(category)
        if (category === null) {
            res.redirect('/shop');
            return
        }
        if (!result.isEmpty()) {
            res.send("error!" + result.toString())
        } else {
            const newCategory = new Category({_id: category._id, category: req.body.categoryName})
            await Category.updateOne(category, newCategory).exec()

            res.redirect(newCategory.url)
        }
        
    })
];

exports.category_delete = asyncHandler(async (req, res, next) => {
    res.send("DELETE CATEGORY: NOT IMPLEMENTED YET")
});