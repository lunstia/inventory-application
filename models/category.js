const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Category = new Schema({
    category: {type: String, unique: true, required: true, minLength: 3, maxLength: 20},
})

Category.virtual('url').get(function() {
    return `/shop/${this.category}`;
})

module.exports = mongoose.model("Category", Category);