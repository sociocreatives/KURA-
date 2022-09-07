"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const default_config_1 = __importDefault(require("./default.config"));
const db = new sequelize_1.Sequelize(default_config_1.default.DB.NAME, default_config_1.default.DB.USER, default_config_1.default.DB.PASSWORD, {
    storage: "./database.sqlite",
    dialect: "mariadb",
    logging: console.log,
    dialectOptions: {
        allowPublicKeyRetrieval: true
    }
});
exports.default = db;
