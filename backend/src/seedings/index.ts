import { BadRequestError } from "../errors";
import { User, UserRole } from "../models";
import db from "./../config/database.config";
import appConfig from "./../config/default.config";

const isDev = appConfig.DB.ENVIRONMENT === "development";

const dbSeeder = async () => {
  // DELETE MODELS



  try {
    const admin = await User.create({
      username: "weighAdmin",
      name: "Admin Admin",
      email: "adminweighing@kura.go.ke",
      password: "admin@123",
      role: UserRole.ADMIN,
    });
    console.log(admin);
  } catch (error) {
    console.log("Error", error);
  }
};

const seed = async () => {
  // check that the DB password and DB URL is provided
  if (!appConfig.DB.HOST) {
    throw new BadRequestError(`Error: No DB url setup`);
  }
  try {
    db.sync({ alter: isDev })
      .then(() => console.log("Successfully connected to DB"))
      .catch((error: any) => console.log(`Error Occurred: ${error.message}`));
    //start app
    console.log("Connected to MongoDb");
    await dbSeeder();
  } catch (err) {
    console.log(err);
  }
};

seed();
