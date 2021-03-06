import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack_clone', 'f', 'postgres', {
  dialect: 'postgres',
  define: {
    underscored: true
  }
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message')
}


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models["sequelize"] = sequelize;
models["Sequelize"] = Sequelize;

// module.exports = models;
export default models;
