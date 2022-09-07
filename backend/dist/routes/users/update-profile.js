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
exports.updateProfile = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("./../../middlewares/validate-request");
const require_auth_1 = require("./../../middlewares/require-auth");
const user_1 = require("./../../models/user");
const errors_1 = require("../../errors");
const router = express_1.default.Router();
exports.updateProfile = router;
router.patch("/api/users/update-profile", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Please provide your name"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Please provide your email address"),
    (0, express_validator_1.body)("phone").notEmpty().withMessage("Please provide your phone number"),
], validate_request_1.validateRequest, require_auth_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, email, photo, name } = req.body;
    const existingUser = yield user_1.User.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!existingUser) {
        throw new errors_1.BadRequestError("User with the details not found");
    }
    existingUser.email = email;
    existingUser.name = name;
    existingUser.username = username;
    existingUser.photo = photo;
    yield existingUser.save();
    res.send({
        status: "success",
        message: `Successfully updated your profile`,
        user: existingUser,
    });
}));
