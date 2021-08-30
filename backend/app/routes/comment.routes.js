module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  // Create a new Comment
  router.post("/comment", auth, comments.create);

  app.use("/api/comments", router);
};
