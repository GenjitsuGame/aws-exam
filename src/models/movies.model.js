// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const movies = sequelizeClient.define('movies', {
    id: {
      type: Sequelize.STRING(25),
      unique: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {
      associate (models) { // eslint-disable-line no-unused-vars
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
      }
    }
  });

  return movies;
};
