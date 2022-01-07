//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const items = ["LeetCode", "WebDevelopment", "CodeForces"];
const workItems = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;
  console.log(req.body.list);
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});



app.listen(3000, function() {
  console.log("server started on port 3000");
});
