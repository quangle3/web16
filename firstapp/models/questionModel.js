const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const QuestionSchema = new Schema({
    //name : String..
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    content: { type: String, required: true } 
}, {
    //option
    timestamps: true,
    // _id: false
});

module.exports = mongooes.model("Quesiton", QuestionSchema);