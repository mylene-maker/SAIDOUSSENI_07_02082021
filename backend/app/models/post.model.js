module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      message: {
        type: Sequelize.STRING
      },
      lien: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return Post;
  };