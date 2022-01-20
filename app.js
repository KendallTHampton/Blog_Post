//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));




mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

// MONGOOSE SCHEMA


const postSchema = mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post", postSchema)









// HOME PAGE

app.get("/", (req, res) => {

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });
});







// ABOUT PAGE

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });

});


// CONTACT PAGE

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});



// COMPOSE PAGE

app.get("/compose", (req, res) => {
  res.render("compose");

})

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody

  })
  post.save(function(err) {
    if (!err) {
      res.redirect("/")
    }
  });



})



// .split(" ").join("-").toLowerCase()

// POSTS PAGES

app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId


  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {
    res.render("post", {
      title: post.title,
      content: post.content
    })
  });
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
