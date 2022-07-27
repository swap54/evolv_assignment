const mongoose = require('mongoose');
const meal = require("./meal");

const user = new mongoose.Schema({
    name:String,
    calorieRequirement:Number,
    mealPlan:{
        date:Date,
        meal:[String],
    }
})

module.exports = mongoose.model('user',user);