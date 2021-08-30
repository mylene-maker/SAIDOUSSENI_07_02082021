module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      pseudo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mot_de_passe: {
          type:Sequelize.STRING
      },
      admin: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };