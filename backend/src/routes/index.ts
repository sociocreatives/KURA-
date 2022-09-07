import { app } from "./../app";
import {
  signInRouter,
  signOutRouter,
  signUpRouter,
  currentUserRouter,
  updateProfile,
  restPassword,
} from "./users";
import {ReadingRoute }  from "./readings/index"
import  {SettingRoute}  from  "./settings/index"
app.use(ReadingRoute )
app.use([
  signUpRouter,
  signInRouter,
  restPassword,
  signOutRouter,
  currentUserRouter,
  updateProfile,
]);
app.use(SettingRoute)