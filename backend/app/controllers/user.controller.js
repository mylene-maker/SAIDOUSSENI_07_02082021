const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  bcrypt.hash(req.body.mot_de_passe, 10).then((hash) => {
    if (hash) {
      // Create an user
      const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        email: req.body.email,
        mot_de_passe: hash,
      };

      // Save User in the database
      User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        });
    }
  });
};

/* Connect an User account */

exports.login = (req, res, next) => {
  User.findOne({where: { email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            userEmail: user.email,
            userPassword: user.mot_de_passe,
            token:  jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            admin: user.admin
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Find a single User with an id
exports.findOne = (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

// Update an User by the id in the request
exports.update = (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id },
  })
    .then(() =>
      res.status(200).json({ message: "données mis à jour avec succées !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Delete an User with the specified id in the request
exports.delete = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
