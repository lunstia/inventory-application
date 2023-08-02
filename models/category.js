const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Category = new Schema({
    category: String,
})

Category.virtual('url').get(function() {
    return `/${this.category}`;
})

export default mongoose.model("Category", Category);