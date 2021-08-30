module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      commentaire: {
        type: Sequelize.STRING
      }
    });
  
    return Comment;
  };