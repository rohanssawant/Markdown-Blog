const express = require("express");
const router = express.Router();
const Article = require("../models/articles.js");

router.get("/new", (req, res) => {
  res.render("articles/new.ejs", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render("articles/show", { article });
});

http: router.get("/edit/:id", async (req, res) => {
  // res.send(`inside /articles/edit/id${req.params.id}`);
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article });
});

router.post("/", async (req, res) => {
  const { title, description, markdown } = req.body;
  let article = new Article({
    title,
    description,
    markdown,
  });
  try {
    article = await article.save();
    res.redirect(`articles/${article.id}`);
  } catch (error) {
    console.log(`ARTICLE SAVE ERROR ${error}`);
    res.render(`articles/new`, { article }); //article:article
  }
});

router.delete("/:id", async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.put("/:id", async (req, res) => {
  let article = await Article.findById(req.params.id);
  const { title, description, markdown } = req.body;
  (article.title = title),
    (article.description = description),
    (article.markdown = markdown);
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.log(error);
    res.render("articles/edit/", { article });
  }
});

http: module.exports = router;
