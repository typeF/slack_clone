export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message', 
    {
      text: DataTypes.STRING
    },
    { 
      underscored: true 
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'channelId',
        field: 'channel_id',
      } 
    });

    Message.belongsTo(models.User, {
      foreignKey: {
        name: 'userID',
        field: 'user_id'
      }
    });
  }

  return Message;
};
