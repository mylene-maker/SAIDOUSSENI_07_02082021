const { users } = require("../models");
const db = require("../models");
const Post = db.posts;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
console.log('blabla')
  const postObject = JSON.parse(req.body.content);

  // Create a Post
  const post = {
    message: postObject.message,
    lien: postObject.lien,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: postObject.userId
  };

  console.log(post)

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
  console.log(userId);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erruer est survenue lors de la création de votre Post."
      });
    }); 
};


// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll()
  .then((posts) => res.status(200).json(posts))
  .catch((error) => res.status(400).json({ error }));
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
  .then((post) => res.status(200).json(post))
  .catch((error) => res.status(400).json({ error }));
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  Post.update(req.body,
    { where: { id: req.params.id } })
  .then((post) => res.status(200).json({ message: "Votre poste est bien mis à jour !" }))
  .catch((error) => res.status(400).json({ error }));
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  Post.destroy({ where: { id: req.params.id} })
  .then((post) => res.status(200).json({ message: "le post à été supprimé !"}))
  .catch((error) => res.status(400).json({ error }));
};

