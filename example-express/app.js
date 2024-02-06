const cors = require("cors");
const express = require("express");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.all("*", (req, res) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
