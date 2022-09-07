"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const utils_1 = require("../utils");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["OPERATOR"] = "operator";
    UserRole["NORMAL"] = "normal";
})(UserRole || (UserRole = {}));
exports.UserRole = UserRole;
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password_changed_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "operator",
    },
}, {
    sequelize: database_config_1.default,
    tableName: "users",
    hooks: {
        beforeCreate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.getDataValue("password")) {
                user.setDataValue("password", yield utils_1.PasswordManager.toHash(user.getDataValue("password")));
            }
        }),
        beforeUpdate: (user, options) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.changed("password") && user.get("password")) {
                user.setDataValue("password", yield utils_1.PasswordManager.toHash(user.getDataValue("password")));
            }
        }),
    },
});
// ASSOCIATIONS
