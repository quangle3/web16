const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    name : [String],
    input : {
        input : []
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("Name", NameSchema);