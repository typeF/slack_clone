export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user', 
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            message: "Username can only have letters and numbers"
          },
          len: {
            args: [3, 25],
            message: "Username length must be between 3-25 characters"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            message: "Invalid email format"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
      }
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    });
  }
  return User;
};
