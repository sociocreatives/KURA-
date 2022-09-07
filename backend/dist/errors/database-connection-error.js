"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabataseConnectionError = void 0;
const custom_error_1 = require("./custom-error");
class DatabataseConnectionError extends custom_error_1.CustomError {
    constructor() {
        super("Database Error");
        this.reason = "Error connection to database";
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabataseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabataseConnectionError = DatabataseConnectionError;
