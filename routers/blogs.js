const { Router } = require('express');
const app = Router();
module.exports = app;

// Import private
const { removeSpaces, newLine, removeDash, error } = require("../modules/private.js");

// Import node modules
var { markdown } = require( "markdown" )

// Import database schemas
const Blog = require("../modules/database/blog")

// Load home page
app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({createdAt: -1})
  res.render("blogs/blogs", {blogs})
})

app.get("/new", async (req, res) => {
  res.render("blogs/new-blog")
})

app.post("/new", async (req, res) => {
  let {title, subtitle, body, information} = req.body;
  // todo add authentication handling here

  // todo add argument proper handling here
  // Check if all fields are submitted correctly
  if (!title || !subtitle || !body || !information) return error("Parameter Missing", "Please make sure all fields are filled", res);

  // Check if blogs exists already
  let [blogExists] = await Blog.find({title});
  // todo add proper handling here
  if (blogExists) return res.send("Blog already exists");


  // Convert markdown to HTML, then replace "\n" with <br>
  body = markdown.toHTML(body);
  body = newLine(body);

  // Make endpoint for blog aesthetically pleasing and URL compatible
  let urlName = removeSpaces(title)

  // Make blog model and save it
  let newBlogModel = new Blog({
    title, 
    subtitle, 
    body, 
    information,
    urlName
  })
  let result = await newBlogModel.save()
  

  // todo redirect to blog page
  res.send("Blog created successfully")
})


app.get("/:urlName", async (req, res) => {
  // Get the "urlName" of the requested post
  let {urlName} = req.params;

  // Check if blog post exists
  let [blogPost] = await Blog.find({urlName});
  // todo error handling
  if (!blogPost) return res.send("Blog not found");

  // todo create this
  res.send(blogPost)
})