"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Message = sequelize.define('message', {
        text: DataTypes.STRING
    });
    Message.associate = function (models) {
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
    };
    return Message;
});
//# sourceMappingURL=message.js.map