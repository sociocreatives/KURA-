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
exports.restPassword = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./../../models/user");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("./../../middlewares/validate-request");
const bad_request_error_1 = require("./../../errors/bad-request-error");
const router = express_1.default.Router();
exports.restPassword = router;
router.post("/api/users/rest-password", [
    (0, express_validator_1.body)("code")
        .trim()
        .isLength({ min: 6, max: 6 })
        .notEmpty()
        .withMessage("Must provide sms token"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .notEmpty()
        .withMessage("Must provide password"),
    (0, express_validator_1.body)("password_confirm")
        .trim()
        .isLength({ min: 4, max: 20 })
        .notEmpty()
        .withMessage("Please confirm your password"),
], validate_request_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, password, password_confirm } = req.body;
    if (password !== password_confirm) {
        throw new bad_request_error_1.BadRequestError("Password and Password Confirm must be the same");
    }
    const existingUser = yield user_1.User.findOne({
        where: { password_changed_token: code },
    });
    if (!existingUser) {
        throw new bad_request_error_1.BadRequestError("User does not exists!!");
    }
    existingUser.password = password;
    res.send({
        status: "success",
        message: "Successfully changed your password",
    });
}));
