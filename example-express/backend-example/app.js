const express = require("express");
const app = express();
const blogRoutes = require("./routes/blogRoutes");
app.use(express.json());

app.use("/api/blogs", blogRoutes);

module.exports = app;
