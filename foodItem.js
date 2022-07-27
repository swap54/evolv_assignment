const mongoose = require('mongoose');
const foodItem = new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carb:Number,
    itemWeight:Number,
});

module.exports = mongoose.model("foodItem",foodItem);