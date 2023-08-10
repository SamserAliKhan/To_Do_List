const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app=express();

app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.json());

app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/toDoListDB',{ useNewUrlParser: true });
const itemSchema ={
	name: String,
};

const Item=mongoose.model("Item",itemSchema);

const item1 = new Item({name:"Welcome to your T-Do list "});
const item2 = new Item({name:"Hit the + button to add a new item "});
const item3 = new Item({name:"<-- Hit this to delete an item "});

const defaultitems = [item1,item2,item3];
//wrong

// Item.insertMany(defaultitems,function(err){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log("Successfully added items to teh Data base")
// 	}
// });

//correct

// Item.insertMany(defaultitems)
//       .then(function () {
//         console.log("Successfully saved defult items to DB");
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

app.get("/",async (req,res)=>{
  try{
    const founditems = await Item.find({});
    console.log(founditems);
    res.sendFile("index.html",{root:__dirname,newListItem: founditems});
  }
  catch(err){
    console.log(err)
  }
});
/*app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({ });
    res.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }
}); */

app.post("/",function(req,res){
	const item = req.body.newItem;

})
app.listen(3000,function(){
});