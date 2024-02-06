const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json("username already exists");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const jwt = require("jsonwebtoken");
const secret = "secretkey";
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    } else {
      const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: "1h",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60000,
        sameSite: "strict",
      });
 
      res.status(200).send({
        message: "Logged in successfully",
        user: { _id: user._id, email: user.email },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      message: "An error occurred during login",
    });
  }
};

exports.authenticatedRoute = async (req, res) => {
  try {
    console.log(req.cookies.token);
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, secret);
    const userData = await User.findOne({ _id: decoded._id });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred." });
  }
};
exports.logoutUser = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
    });

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
