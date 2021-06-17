const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles.js");
const Article = require("./models/articles.js");

const app = express();
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// mongoDb connection
const db_url = process.env.DB_URL;
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`MONGOOSE CONNECTED..`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index.ejs", {
    articles: articles,
  });
});

app.use("/articles", articleRouter);

const PORT = 2001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
