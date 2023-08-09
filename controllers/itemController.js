const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const Item = require('../models/item');
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

exports.item_read = asyncHandler(async (req, res, next) => {
    const item = mongoose.isValidObjectId(req.params.id) ? await Item.findById(req.params.id).exec() : null

    if (item === null) {
        res.redirect('..')
        return
    }
    res.render('item', {item: item});
})

exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec()

    if (categories === null) {
        res.send("Create a category first.")
        return
    }

    res.render("item_form", {categories: categories, current: req.params.category});
})

exports.item_create_post = [
    body("category").escape(),
    body("name")
        .trim()
        .isLength({min: 3, max: 100})
        .escape(),
    body("description").optional().escape(),
    body("price").trim().isNumeric().escape(),
    body("quantity").trim().isNumeric().escape(),

    asyncHandler(async (req, res, next) => {
        const result = validationResult(req)
        const category = await Category.findOne({category: req.body.category}).exec()
        if (category === null) {
            res.send('Category did not exist');
            return
        }
        if (!result.isEmpty()) {
            res.send("error!" + result.toString())
        } else {
            const item = new Item({
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                image: ''
            })
            await item.save()

            res.redirect(category.url)
        }
    })
]

exports.item_update_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec()
    const item = await Item.findById(req.params.id).exec()

    if (item === null) {
        res.send("Item does not exist!");
        return
    }

    if (categories === null) {
        res.send("Create a category first.")
        return
    }

    res.render("item_form", {item: item, categories: categories, current: req.params.category});
})

exports.item_update_post = [
    body("category").escape(),
    body("name")
        .trim()
        .isLength({min: 3, max: 100})
        .escape(),
    body("description").optional().escape(),
    body("price").trim().isNumeric().escape(),
    body("quantity").trim().isNumeric().escape(),

    asyncHandler(async (req, res, next) => {
        const result = validationResult(req)
        const item = await Item.findById(req.params.id)
        if (item === null) {
            res.redirect('../..')
            return
        }

        const category = await Category.findOne({category: req.body.category}).exec()
        if (category === null) {
            res.send('Category did not exist');
            return
        }
        if (!result.isEmpty()) {
            res.send("error!" + result.toString())
        } else {
            const newItem = new Item({
                _id: item._id,
                category: req.body.category,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                image: ''
            })
            await Item.updateOne(item, newItem)

            res.redirect(category.url)
        }
    })
]

exports.item_delete = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndDelete(req.params.id).exec();

    res.redirect('../..')
})