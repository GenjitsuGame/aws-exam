const Sequelize = require('sequelize');

module.exports = function () {
  const app = this;
  const connectionString = app.get('mysql');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    const snowflake = app.get('snowflakeWorker');

    sequelize.addHook('beforeCreate', function (instance, options, cb) {
      if (instance.id) return null;
      snowflake.getId((err, id) => {
        if (err) return cb(err);
        instance.id = id;
        cb();
      });
    });

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync({});

    return result;
  };
};
