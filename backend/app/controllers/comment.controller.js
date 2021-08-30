const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Create a Comment
    const comment = {
      commentaire: req.body.commentaire
    };
  
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      });
  };
  