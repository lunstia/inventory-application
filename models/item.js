const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Item = new Schema({
    category: {type: String, ref:"Category", required: true},
    name: {type: String, required: true, minLength: 3, maxLength: 100},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    image: {type: String, default: ''},
})

Item.virtual('url').get(function() {
    return `/shop/${this.category}/${this._id}`;
})

module.exports = mongoose.model("Item", Item);