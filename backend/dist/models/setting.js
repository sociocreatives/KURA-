"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class Setting extends sequelize_1.Model {
}
exports.Setting = Setting;
Setting.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
    serial_port: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    overloaded: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "settings",
});
