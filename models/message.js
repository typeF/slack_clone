export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    text: DataTypes.STRING
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'channelId'
    });
    Message.belongsTo(models.User, {
      foreignKey: 'userID'
    });
  }
    
  return Message;
};
