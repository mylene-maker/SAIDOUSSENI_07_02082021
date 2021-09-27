const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.create = (req, res) => {
    // Create a Comment
    const comment = {
      commentaire: req.body.commentaire,
      userId: req.body.userId,
      postId: req.body.postId
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



  // Retrieve all Comments from the database.
exports.findAll = (req, res) => {
  Comment.findAll()
  .then((comments) => res.status(200).json(comments))
  .catch((error) => res.status(400).json({ error }));
};

// Find a single Comment with an id
exports.findOne = (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
  .then((comment) => res.status(200).json(comment))
  .catch((error) => res.status(400).json({ error }));
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  Comment.update(req.body,
    { where: { id: req.params.id } })
  .then((comment) => res.status(200).json({ message: "Votre commentaire est bien mis à jour !" }))
  .catch((error) => res.status(400).json({ error }));
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  Comment.destroy({ where: { id: req.params.id} })
  .then((comment) => res.status(200).json({ message: "le commentaire à été supprimé !"}))
  .catch((error) => res.status(400).json({ error }));
};