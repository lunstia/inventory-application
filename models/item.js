const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Item = new Schema({
    category: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, default: 0},
    image: {type: String, default: ''},
})

Category.virtual('url').get(function() {
    return `/${this.category}/${this._id}`;
})

export default mongoose.model("item", Item);