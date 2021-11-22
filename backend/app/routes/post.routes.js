module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    const auth = require('../middleware/auth');
    const multer = require("../middleware/multer-config");
    var router = require("express").Router();
  

    // Create a new Post
    router.post("/post", auth, multer, posts.create);
  
    // Retrieve all Posts
    router.get("/", posts.findAll);
  
    // Retrieve a single Post with id
    router.get("/:id",  posts.findOne);
  
    // Update a Post with id
    router.put("/:id", posts.update);
  
    // Delete a Post with id
    router.delete("/:id", auth, posts.delete);
  
    app.use('/api/posts', router);
  };