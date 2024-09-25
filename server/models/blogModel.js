const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogImage: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogDescription: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Blogs = mongoose.model("blog", blogSchema);

module.exports = Blogs;
