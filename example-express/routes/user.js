const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(userController.createUser);

router.route("/login").post(userController.loginUser);

router.route("/logout").get(userController.logoutUser);

router.route("/authenticate").get(userController.authenticatedRoute);

module.exports = router;
