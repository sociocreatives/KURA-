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
exports.app = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const SerialPort = require("serialport");
const cookie_session_1 = __importDefault(require("cookie-session"));
const error_handlers_1 = require("./middlewares/error-handlers");
const index_1 = require("./errors/index");
const setting_1 = require("./models/setting");
require("express-async-errors");
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
//MIDDLEWARES
app.use((0, cors_1.default)());
app.set("trust proxy", 1);
app.use((0, cookie_session_1.default)({
    signed: false,
    httpOnly: true,
}));
app.use(express_1.default.json({ limit: "3000mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(`${__dirname}/public`));
// STATIC FILES
// SOCKETS
const socket = new socket_io_1.default.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
let records = [108];
const loadSerialPort = () => __awaiter(void 0, void 0, void 0, function* () {
    const settings = yield setting_1.Setting.findAll();
    let port = "COM4";
    const message = "Portal WeighBridge";
    if (settings.length > 0) {
        console.log(settings[0]);
        port = settings[0].serial_port;
    }
    try {
        const serialPort = SerialPort(port, {
            baudRate: 9600,
        });
        serialPort.on("error", function (err) {
            console.log(err);
        });
        serialPort.open(function (err) {
            if (err) {
                console.log("Error:!!", err);
            }
            serialPort.write(message, function (err) {
                if (err) {
                    return console.log("Error on write: ", err.message);
                }
                console.log("Message sent successfully");
            });
            serialPort.on("data", function (data) {
                // console.log(typeof Buffer.from(data).toString());
                //data  =  GG, GJ, 0000135KG
                // console.log(data)
                // console.log(Buffer.from(data).toString().replace(/\D/g, "")); // ["GG","GJ","0000135KG"]
                let weight = Buffer.from(data).toString().replace(/\D/g, "");
                if (parseFloat(weight)) {
                    console.log(`weight: ${parseFloat(weight)}`);
                    records.push(parseFloat(weight));
                }
            });
        });
    }
    catch (error) {
        console.log("Error: ", error);
    }
});
// enable it on production
loadSerialPort();
// ADD ROUTES
require("./routes/index");
// serial port records
app.get("/api/get-records", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        readings: records,
    });
}));
/**
 * NOT FOUND
 */
app.all("*", () => __awaiter(void 0, void 0, void 0, function* () {
    throw new index_1.NotFoundError();
}));
// ERROR Handle Midldeware
app.use(error_handlers_1.errorHandler);
