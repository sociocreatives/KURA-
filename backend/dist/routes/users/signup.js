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
exports.signUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../middlewares/validate-request");
const bad_request_error_1 = require("../../errors/bad-request-error");
const user_1 = require("../../models/user");
const router = express_1.default.Router();
exports.signUpRouter = router;
router.post("/api/users/signup", [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Please provide user's username"),
    (0, express_validator_1.body)("role").notEmpty().withMessage("Please provide user role"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Please provide user's name"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Please provide your password"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, role, username, password } = req.body;
    const existingUser = yield user_1.User.findOne({ where: { email } });
    if (existingUser) {
        throw new bad_request_error_1.BadRequestError("User with the already provided credentials exists");
    }
    const user = yield user_1.User.create({ username, name, password, role, email });
    const newUsers = {
        email: user.getDataValue("email"),
        username: user.getDataValue("username"),
        role: user.getDataValue("role"),
        name: user.getDataValue("name"),
    };
    res.status(201).json({
        user: Object.assign(Object.assign({}, user.toJSON()), { id: user.id }),
        status: "success",
        message: "Successfully create new account",
    });
}));
