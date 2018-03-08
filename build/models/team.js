"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, DataTypes) {
    var Team = sequelize.define("team", {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
    });
    Team.associate = function (models) {
        Team.belongsToMany(models.User, {
            through: "member",
            foreignKey: {
                name: "teamId",
                field: "team_id"
            }
        });
        Team.belongsTo(models.User, {
            foreignKey: "owner"
        });
    };
    return Team;
});
//# sourceMappingURL=team.js.map