const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSChema = new Schema({
    username: String,
    googleId: String
}, {

});

module.exports = mongoose.model('User', userSChema);