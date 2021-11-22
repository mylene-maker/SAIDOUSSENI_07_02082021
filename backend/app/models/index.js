const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/*initialization of models*/

db.users = require("./user.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);


/* define association here */

// clé etrangère pour les posts
db.users.hasMany(db.posts, { as: "posts"}); // user can have multiple posts
db.posts.belongsTo(db.users, { // one post for one user
  foreignKey: "userId",
  as: "user",
  onDelete: 'CASCADE',
})
// clé etrangère pour les commentaires
db.users.hasMany(db.comments, { as: "comments"}); // user can have multiple comments
db.comments.belongsTo(db.users, { // one comment for one user
  foreignKey: "userId",
  as: "user",
  onDelete: 'CASCADE',
})

db.posts.hasMany(db.comments, { as: "comments"}); //post can have multiple comments
db.comments.belongsTo(db.posts, {
  foreignKey: "postId",
  as: "post",
  onDelete: 'CASCADE',
})

/* Synchronisation des tables */

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

module.exports = db;