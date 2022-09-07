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
exports.signOutRouter = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./../../models/index");
const index_2 = require("../../middlewares/index");
const router = express_1.default.Router();
exports.signOutRouter = router;
router.post("/api/users/signout", index_2.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    req.user = undefined;
    /* Get Token and invalidate it*/
    const availableToken = yield index_1.Token.findOne({ where: { token } });
    if (availableToken) {
        availableToken.is_active = false;
        yield availableToken.save();
    }
    res.send({ message: "Sign Out successfully" });
}));
