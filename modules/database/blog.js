const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  subtitle: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  information: {
    required: true,
    type: String
  },
  urlName: {
    required: true,
    type: String
  }
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;