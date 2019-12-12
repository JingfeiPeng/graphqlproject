const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstructionSchema = new Schema({
    name: String,
    time: Number // in miniutes
})

module.exports = mongoose.model("Instruction", InstructionSchema);