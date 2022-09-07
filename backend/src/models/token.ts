import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface Attrs {
  id?: number;
  token: string;
  is_active?: boolean;
}

export class Token extends Model<Attrs> {
  public id?: number;
  public token!: string;
  public is_active!: boolean;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    tableName: "tokens",
  }
);
