import { Sequelize } from "sequelize";
import appConfig from "./default.config";

const db = new Sequelize(
  appConfig.DB.NAME,
  appConfig.DB.USER,
  appConfig.DB.PASSWORD,
  {
    storage: "./database.sqlite",
    dialect: "mariadb",
    logging: console.log,
    dialectOptions: {
      allowPublicKeyRetrieval:  true
    }
  }
);

export default db;
