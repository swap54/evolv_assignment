const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const { application } = require('express');
const foodItem = require('./foodItem');
const meal = require('./meal');
const app = express();
const user = require('./user');
app.use(cors());
const PORT = 3001;


mongoose.connect('mongodb+srv://new_user2:PAUQxQRCTIgS2RZL@cluster0.7gatw.mongodb.net/evolv?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true 
}).then( () => {
    console.log('Connected to the database ') 
})
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})




app.post('/foodItem',async(req,res)=>{
    const newFoodItem = new foodItem({
        name:req.query.name,
        calories:parseInt(req.query.calories),
        protein:parseFloat(req.query.protein),
        carb:parseInt(req.query.protein),
        itemWeight:parseInt(req.query.itemWeight)
    });
    await newFoodItem.save();
    res.send("added");
})
app.post('/meal',async(req,res)=>{
    const foodArray = req.query.food.split(',');
    const newMeal = new meal({
        category:req.query.category,
        name:req.query.name,
        food:foodArray
    });
    await newMeal.save();
    res.send("added");
    console.log(foodArray);
})
app.post('/user',async(req,res)=>{
    const mealArray = req.query.meal.split(',');
    const Datedata = req.query.date.concat('Z');
    console.log(Datedata)
    const newUser = new user({
        name:req.query.name,
        calorieRequirement:parseInt(req.query.calorieReq),
        mealPlan:{
            date:new Date(Datedata),
            meal:mealArray,
        }
    })
    await newUser.save();
    res.send("User added")
})
app.post('/updateMeal',async(req,res)=>{
    const foodArray = req.query.food.split(',');
    const filter = {name:req.query.meal};
    meal.findOneAndUpdate(filter, 
        {food:foodArray}, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send("Data updated!");
            }
        });  
})
app.post('/updateUser',(req,res)=>{
    const mealArray = req.query.meal.split(',');
    const filter = {name:req.query.user};
    //const update = {mealPlan:{date,meal:mealArray}}
    user.updateOne(filter, {"$set": {"mealPlan.meal": mealArray}}, function(err, data) {
            if(err){
                console.log(err)
            }
            else{
                res.send("User updated!");
            }        
        
        });  
})
async function calculate(){
    const items = await foodItem.find();
    items.sort((a,b)=>{
        return b.calories-a.calories;
    })
    items.map(async (item)=>{
        const finals=[];
        // if(((item.protein)/(item.calories))>=0.2){
        //     finals.push(item);
        // }
        // //const calorie = item.calories;
        // console.log(finals)
        console.log(item.name)
    })
    
}
setImmediate(calculate);
app.listen(PORT,()=>{
    console.log("server running");
})