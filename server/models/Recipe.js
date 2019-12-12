const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name: String,
    chef: Chef,
    Ingredients: [Ingredient],
    instructions:[Instruction]
})

module.exports = mongoose.model("Recipe", recipeSchema);
