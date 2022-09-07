import { Model, DataTypes, CreateOptions, UpdateOptions } from "sequelize";
import db from "../config/database.config";
import { PasswordManager } from "../utils";

enum UserRole {
  ADMIN = "admin",
  OPERATOR = "operator",
  NORMAL = "normal",
}

export { UserRole };

interface Attrs {
  id?: number;
  username: string;
  name: string;
  email: string;
  photo?: string;
  password: string;
  password_changed_token?: string;
  role?: string;
}

export class User extends Model<Attrs> {
  public id!: number;
  public name!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public password_changed_token?: string;
  public photo!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password_changed_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "operator",
    },
  },
  {
    sequelize: db,
    tableName: "users",
    hooks: {
      beforeCreate: async (user: User, options: CreateOptions) => {
        if (user.getDataValue("password")) {
          user.setDataValue(
            "password",
            await PasswordManager.toHash(user.getDataValue("password"))
          );
        }
      },
      beforeUpdate: async (user: User, options: any) => {
        if (user.changed("password") && user.get("password")) {
          user.setDataValue(
            "password",
            await PasswordManager.toHash(user.getDataValue("password"))
          );
        }
      },
    },
  }
);

// ASSOCIATIONS
