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
exports.currentUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./../../models/user");
const index_1 = require("../../middlewares/index");
const router = express_1.default.Router();
exports.currentUserRouter = router;
router.get("/api/users/currentuser", index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.User.findByPk((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    let currentUser = {
        email: user === null || user === void 0 ? void 0 : user.getDataValue("email"),
        id: user === null || user === void 0 ? void 0 : user.getDataValue("id"),
        name: user === null || user === void 0 ? void 0 : user.getDataValue("name"),
        photo: user === null || user === void 0 ? void 0 : user.getDataValue("photo"),
        role: user === null || user === void 0 ? void 0 : user.getDataValue("role"),
        username: user === null || user === void 0 ? void 0 : user.getDataValue("username"),
    };
    res.status(200).json({
        status: "sucess",
        user: currentUser,
    });
}));
router.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.findAll();
    res.status(200).json({
        status: "success",
        users,
    });
}));
