// Require node modules
const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

// Create app
const app = express()


const { mongoCredential } = require("./config.js");

// Connect to mongodb
mongoose.connect(mongoCredential, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false,
  useCreateIndex: true
}).then(results => {
  // Start server after connecting
  app.listen(8080);
  console.log("Server Started, Database Connect Established.");
});

// Register ejs engines
app.engine("ejs", ejs.renderFile);
app.set('view engine', "ejs");
app.set("views", `${__dirname}/views`);

// Register body parser and cookie parser
app.use(cookieParser())
app.use(bodyParser())

// Server static files (HTML, CSS, JS, etc)
app.use(express.static(`${__dirname}/public`))

// Define routes
app.use("/blogs", require("./routers/blogs.js"))

app.get("/", async (req, res) => {
  res.redirect("/blogs")
});
