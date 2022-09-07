"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./../app");
const users_1 = require("./users");
const index_1 = require("./readings/index");
const index_2 = require("./settings/index");
app_1.app.use(index_1.ReadingRoute);
app_1.app.use([
    users_1.signUpRouter,
    users_1.signInRouter,
    users_1.restPassword,
    users_1.signOutRouter,
    users_1.currentUserRouter,
    users_1.updateProfile,
]);
app_1.app.use(index_2.SettingRoute);
