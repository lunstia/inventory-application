const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const Item = require('../models/item');
const Category = require("../models/category");

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

    res.render("item_form", {categories: categories});
})

exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ITEM CREATE")
})

exports.item_update = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ITEM UPDATE")
})

exports.item_delete = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: ITEM DELETE")
})