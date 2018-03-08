"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.default('slack_clone', 'f', 'postgres', {
    dialect: 'postgres',
    define: {
        underscored: true
    }
});
var models = {
    User: sequelize.import('./user'),
    Channel: sequelize.import('./channel'),
    Team: sequelize.import('./team'),
    Message: sequelize.import('./message')
};
Object.keys(models).forEach(function (modelName) {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});
models["sequelize"] = sequelize;
models["Sequelize"] = sequelize_1.default;
// module.exports = models;
exports.default = models;
//# sourceMappingURL=index.js.map