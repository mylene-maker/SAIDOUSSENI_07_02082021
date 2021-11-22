const db = require("../models");
const Comment = db.comments;
const User = db.users;
const Post = db.posts;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
  const commentObject = req.body;

  // create a comment
  const comment = {
    commentaire: commentObject.commentaire,
    userId: commentObject.userId,
    postId: req.params.id
  }

  // save 
  Comment.create(comment)
    .then(data => {
      res.send(data);
  console.log(userId);
  console.log(postId);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erruer est survenue lors de la création de votre Commentaire."
      });
    }); 
}



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