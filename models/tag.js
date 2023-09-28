const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tagSchema  = new Schema({
    tag: String,
},
    { timestamps: true }
);

const Tag = mongoose.models.tags || mongoose.model('tags', tagSchema);
module.exports = Tag;