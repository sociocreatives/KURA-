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
exports.signInRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const models_1 = require("./../../models");
const validate_request_1 = require("./../../middlewares/validate-request");
const bad_request_error_1 = require("./../../errors/bad-request-error");
const password_manager_1 = require("./../../utils/password-manager");
const default_config_1 = __importDefault(require("../../config/default.config"));
const router = express_1.default.Router();
exports.signInRouter = router;
router.post("/api/users/signin", [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Please provide your username."),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Please provide your password"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield models_1.User.findOne({
        where: { username },
    });
    if (!existingUser) {
        throw new bad_request_error_1.BadRequestError("Sorry. Invalid username or password");
    }
    const passwordMatch = yield password_manager_1.PasswordManager.compare(existingUser.getDataValue("password"), password);
    if (!passwordMatch) {
        throw new bad_request_error_1.BadRequestError("Sorry. Invalid username or password");
    }
    // login the user
    const token = jsonwebtoken_1.default.sign({
        id: existingUser.getDataValue("id"),
        email: existingUser.getDataValue("email"),
        username: existingUser.getDataValue("username"),
        photo: existingUser.getDataValue("photo"),
        name: existingUser.getDataValue("name"),
        role: existingUser.getDataValue("role"),
    }, default_config_1.default.JWT_SECRET);
    // add auth token
    req.session = {
        jwt: token,
    };
    res.status(200).json({
        status: "success",
        token,
    });
}));
