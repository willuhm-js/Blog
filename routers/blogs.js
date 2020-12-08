const { Router } = require('express');
const app = Router();
module.exports = app;

// Import private
const { removeSpaces, newLine, removeDash, error } = require("../modules/private");
const { owner } = require("../config");

// Import database schemas
const Blog = require("../modules/database/blog")

// Load home page
app.get("/", async (req, res) => {
  // Find blogs and render them
  let blogs = await Blog.find().sort({createdAt: -1})
  res.render("blogs/blogs", {blogs, owner})
})

app.get("/new", async (req, res) => {
  // Render new-blog page
  res.render("blogs/new-blog", { owner })
})

app.post("/new", async (req, res) => {
  let {title, subtitle, body, information} = req.body;
  
  let { auth } = req.cookies;
  if (!auth) return res.redirect("/");

  // Check if all fields are submitted correctly
  if (!title || !subtitle || !body || !information) return error("Parameter Missing", "Please make sure all fields are filled", res);

  // Check if blogs exists already
  let [blogExists] = await Blog.find({title});
  if (blogExists) return error("Blog Already Exists", "Please re-submit with a different name", res);

  // Replace \n with <br>
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
  
  // Redirect to blog post
  res.redirect(`/blogs/${urlName}`)
})


app.get("/:urlName", async (req, res) => {
  // Get the "urlName" of the requested post
  let {urlName} = req.params;

  // Check if blog post exists
  let [blogPost] = await Blog.find({urlName});

  // Error if blog post cannot be located
  if (!blogPost) return error("Post Not Found", "Blog post has not been found", res)

  // Render blog post
  res.render("blogs/blog-post", {owner, blogPost})
})