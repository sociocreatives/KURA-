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
const app_1 = require("./app");
const database_config_1 = __importDefault(require("./config/database.config"));
const default_config_1 = __importDefault(require("./config/default.config"));
const isDev = default_config_1.default.DB.ENVIRONMENT === "development" ? true : false;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // DB init
    database_config_1.default.sync({ alter: isDev })
        .then(() => console.log("Successfully connected to DB"))
        .catch((error) => console.log(`Error Occurred: ${error.message}`));
    //start app
    app_1.server.listen(4000, () => console.log(`App running on: http://localhost:5000`));
});
start();
