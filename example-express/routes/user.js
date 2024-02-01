const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// Route for getting all Users and creating a new User
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Route for getting, updating, and deleting a specific User
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
