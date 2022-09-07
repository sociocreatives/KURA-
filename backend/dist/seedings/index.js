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
const errors_1 = require("../errors");
const models_1 = require("../models");
const database_config_1 = __importDefault(require("./../config/database.config"));
const default_config_1 = __importDefault(require("./../config/default.config"));
const isDev = default_config_1.default.DB.ENVIRONMENT === "development";
const dbSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    // DELETE MODELS
    try {
        const admin = yield models_1.User.create({
            username: "weighAdmin",
            name: "Admin Admin",
            email: "adminweighing@kura.go.ke",
            password: "admin@123",
            role: models_1.UserRole.ADMIN,
        });
        console.log(admin);
    }
    catch (error) {
        console.log("Error", error);
    }
});
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    // check that the DB password and DB URL is provided
    if (!default_config_1.default.DB.HOST) {
        throw new errors_1.BadRequestError(`Error: No DB url setup`);
    }
    try {
        database_config_1.default.sync({ alter: isDev })
            .then(() => console.log("Successfully connected to DB"))
            .catch((error) => console.log(`Error Occurred: ${error.message}`));
        //start app
        console.log("Connected to MongoDb");
        yield dbSeeder();
    }
    catch (err) {
        console.log(err);
    }
});
seed();
