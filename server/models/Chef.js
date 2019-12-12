const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chefSchema = new Schema({
    name:string,
    recipes: [Recipe]
})



module.exports = mongoose.model("Chef", chefSchema);