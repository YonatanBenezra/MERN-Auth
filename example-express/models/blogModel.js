const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);


// Create the Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
