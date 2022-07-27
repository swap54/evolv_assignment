const mongoose = require('mongoose');
const foodItem = require('./foodItem');
const meal= new mongoose.Schema({
    category:String,
    name:String,
    food:[String]
});

module.exports = mongoose.model("meal",meal);