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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumber = void 0;
const randomCode = () => {
    const digits = 100000;
    const multier = 9000;
    return Math.floor(digits + Math.random() * multier).toString();
};
const formatPhoneNumber = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    let phoneNumber = "";
    if (phone.startsWith("254")) {
        phoneNumber = phone;
    }
    else if (phone.startsWith("0")) {
        phoneNumber = phone.replace("0", "254");
    }
    else if (phone.startsWith("7")) {
        phoneNumber = "254" + phone;
    }
    else if (phone.startsWith("+")) {
        phoneNumber = phone.replace("+", "");
    }
    else if (phone.startsWith("+254")) {
        phoneNumber = phone.replace("+", "");
    }
    return phoneNumber;
});
exports.formatPhoneNumber = formatPhoneNumber;
