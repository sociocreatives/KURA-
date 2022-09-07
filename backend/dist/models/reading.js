"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reading = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
const database_config_1 = __importDefault(require("../config/database.config"));
class Reading extends sequelize_1.Model {
}
exports.Reading = Reading;
Reading.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    transporter: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serial: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    overloaded: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    registration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    source: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weights: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "readings",
});
Reading.belongsTo(_1.User, { foreignKey: "user_id" });
