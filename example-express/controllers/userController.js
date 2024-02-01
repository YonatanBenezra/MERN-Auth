const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
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

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ email: "user@example.com" }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const authenticate = (req, res, next) => {
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      req.user = decoded;
      next();
    }
  });
};

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Access granted" });
});

jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.log("Invalid token");
  } else {
    console.log(decoded);
  }
});
