const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: { type: String, required: true },
    content: { type: String, require: true }
}, {
    _id: false
})

const PostSchema = new Schema({
    view: { type: Number, default: 0 },
    image: { type: String, required: true },
    like: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [CommentSchema],
    title: { type: String },
    description: { type: String, required: true}
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", PostSchema);