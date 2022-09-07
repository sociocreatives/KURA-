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
exports.SettingRoute = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const setting_1 = require("./../../models/setting");
const index_1 = require("../../middlewares/index");
const errors_1 = require("../../errors");
const router = express_1.default.Router();
exports.SettingRoute = router;
router.post("/api/settings", [
    (0, express_validator_1.body)("url").notEmpty().withMessage("Please provider Centralised Server URI"),
    (0, express_validator_1.body)("serial_port").notEmpty().withMessage("Please provider Serial Port"),
    (0, express_validator_1.body)("overloaded")
        .notEmpty()
        .withMessage("Please provider the overloaded"),
], index_1.validateRequest, index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url, serial_port, overloaded, } = req.body;
    const settings = yield setting_1.Setting.findAll();
    if (settings.length > 0) {
        throw new errors_1.BadRequestError(`Settings already exists, please update`);
    }
    const setting = yield setting_1.Setting.create({
        overloaded,
        url,
        serial_port
    });
    res.status(200).json({
        setting: setting,
    });
}));
router.patch("/api/settings/:id", [
    (0, express_validator_1.body)("url").notEmpty().withMessage("Please provider Centralised Server URI"),
    (0, express_validator_1.body)("serial_port").notEmpty().withMessage("Please provider Serial Port"),
    (0, express_validator_1.body)("overloaded")
        .notEmpty()
        .withMessage("Please provider the overloaded"),
], index_1.validateRequest, index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url, serial_port, overloaded, } = req.body;
    const setting = yield setting_1.Setting.findByPk(req.params.id);
    if (!setting) {
        throw new errors_1.BadRequestError(`Settings does not exists`);
    }
    setting.overloaded = overloaded;
    setting.serial_port = serial_port;
    setting.url = url;
    yield setting.save();
    res.status(200).json({
        setting: setting,
    });
}));
/**
 * GET ALL THE READINGS
 */
router.get("/api/setting", index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const setting = yield setting_1.Setting.findAll();
    res.status(200).json({
        setting: setting.length > 0 ? setting[0] : null,
    });
}));
