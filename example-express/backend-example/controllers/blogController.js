const Blog = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.send(newBlog);
  } catch (error) {
    res.send(error);
  }
};
