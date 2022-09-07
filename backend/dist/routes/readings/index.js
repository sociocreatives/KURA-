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
exports.ReadingRoute = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const express_validator_1 = require("express-validator");
const reading_1 = require("./../../models/reading");
const index_1 = require("../../middlewares/index");
const router = express_1.default.Router();
exports.ReadingRoute = router;
router.post("/api/readings", [
    (0, express_validator_1.body)("transporter").notEmpty().withMessage("Please provider driver's name"),
    (0, express_validator_1.body)("owner").notEmpty().withMessage("Please provider vehicle owner name"),
    (0, express_validator_1.body)("source")
        .notEmpty()
        .withMessage("Please provider the vihicle coming from"),
    (0, express_validator_1.body)("destination")
        .notEmpty()
        .withMessage("Please provider the vehicle is heading to"),
    (0, express_validator_1.body)("destination")
        .notEmpty()
        .withMessage("Please provider the vehicle registration number"),
    (0, express_validator_1.body)("cargo")
        .notEmpty()
        .withMessage("Please provider the cargo description of the vehicle"),
    (0, express_validator_1.body)("weights")
        .notEmpty()
        .withMessage("Please provider the vehicle wieghts"),
], index_1.validateRequest, index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { transporter, owner, source, destination, cargo, registration, weights, overloaded, serial, } = req.body;
    const reading = yield reading_1.Reading.create({
        transporter,
        owner,
        source,
        serial,
        overloaded,
        destination,
        cargo,
        registration,
        weights,
        user_id: parseInt((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
    });
    res.status(200).json({
        reading: reading,
    });
}));
/**
 * GET ALL THE READINGS
 */
router.get("/api/readings", index_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const readings = yield reading_1.Reading.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({
        readings: readings,
    });
}));
router.get("/api/readings/filter", 
// requireAuth,
index_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { start_date, end_date } = req.query;
    const where = {
        [sequelize_1.Op.or]: [{
                createdAt: {
                    [sequelize_1.Op.between]: [start_date, end_date]
                },
            }, {
                createdAt: {
                    [sequelize_1.Op.between]: [end_date, start_date]
                }
            }]
    };
    const readings = yield reading_1.Reading.findAll({ where });
    res.status(200).json({
        readings: readings,
    });
}));
