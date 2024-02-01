const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// Route for getting all blogs and creating a new blog
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

// Route for getting, updating, and deleting a specific blog
router
  .route("/:id")
  .get(blogController.getBlog)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
