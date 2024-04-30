const express = require("express");
const bodyParser = require("body-parser");
var app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))  // cause we are using body-parser
app.use(express.static('public')) // to tell express that all static file are present in public folder


const mongoose = require("mongoose");
/* make glowing text for something new or creative */
mongoose.connect("mongodb://127.0.0.1:27017/todolist")

const trySchema = new mongoose.Schema({
    name : String
})

const item = mongoose.model("task",trySchema) //inthis model task in connection

const todo = new item({
    name : "create some videos!!!"
})
const todo1 = new item({
    name : "learn dsa!!!"
})
const todo2 = new item({
    name : "learn database!!!"
})
const todo3 = new item({
    name : "learn node!!!"
})
const todo4 = new item({
    name : "learn react!!!"
})
var example = "working"
var items = []
var result = []

app.get("/",function(req,res){
    item.find().then((result) => {
        res.render("list",{ejes: result})
    }).catch(err=>console.log(err))
})

app.post("/",function(req,res){
    const itemName = req.body.ele1;

    const todoData = new item({
        name:itemName
    })

    todoData.save().then().catch(err=>console.log(err))

    return res.redirect("/")
})


app.post("/delete", function(req, res){
    const checked = req.body.checkbox1;


    item.findByIdAndDelete(checked)
    .then(deletedItem => {
        // Log the success message
        console.log("deleted");
        
        // Redirect to the home page after successful deletion
        res.redirect("/");
    })
    .catch(err => {
        // Log the error
        console.error("Error deleting item:", err);
        
        // Send a 500 Internal Server Error response
        res.status(500).send("Internal Server Error");
    });
 });


//create a server
app.listen(5000, function(){
    console.log("server started")
})