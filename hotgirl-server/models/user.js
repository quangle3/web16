const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    fullname: { type: String, required: true},
    role: { type:String, required:true, default:"user" }
});

module.exports = mongoose.model("User", UserSchema);