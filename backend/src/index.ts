import { server } from "./app";
import db from "./config/database.config";
import appConfig from "./config/default.config";

const isDev = appConfig.DB.ENVIRONMENT === "development" ? true : false;

const start = async () => {
  // DB init
  db.sync({ alter: isDev })
    .then(() => console.log("Successfully connected to DB"))
    .catch((error: any) => console.log(`Error Occurred: ${error.message}`));
  //start app
  server.listen(4000, () =>
    console.log(`App running on: http://localhost:5000`)
  );
};
start();
