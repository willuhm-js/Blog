const { Router } = require('express');
const app = Router();
module.exports = app;

const { removeSpaces, newLine, removeDash } = require("../modules/private.js");

// Import database schemas
const Blog = require("../modules/database/blog")

// Load home page
app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({createdAt: -1})
  res.render("blogs/blogs", {blogs})
})

app.get("/new-blog", async (req, res) => {
  res.render("blogs/new-blog")
})

app.post("/new-blog", async (req, res) => {
  let {title, subtitle, body, information} = req.body;
  // todo add authentication handling here

  // todo add argument proper handling here
  if (!title || !subtitle || !body || !information) return res.send("Missing title/subtitle/body") ;
  
  let [blogExists] = await Blog.find({title})
  // todo add proper handling here
  if (blogExists) return res.send("Blog already exists")
  let urlName = removeSpaces(title)
  let newBlogModel = new Blog({
    title, 
    subtitle, 
    body, 
    information,
    urlName
  })
  let result = await newBlogModel.save()
  console.log(result)
})


app.get("/:urlName", async (req, res) => {
  let {urlName} = req.params;
  // todo create this
})