module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const auth = require("../middleware/auth");
  var router = require("express").Router();

  // Create a new Comment
  router.post("/comment", auth, comments.create);
  // Retrieve all Comments
  router.get("/", comments.findAll);
  // Retrieve a single Comment with id
  router.get("/:id",  comments.findOne);
  
  // Update a Comment with id
  router.put("/:id", comments.update);

  // Delete a Comment with id
  router.delete("/:id", comments.delete);

  app.use("/api/comments", router);
};
