import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface Attrs {
  id?: number;
  serial_port: string;
  overloaded: string;
  url: string;
  is_active?: boolean;
}

export class Setting extends Model<Attrs> {
  public id?: number;
  public overloaded!: string;
  public serial_port!: string;
  public url!: string;
  public is_active!: boolean;
}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    serial_port: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overloaded: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      url: {
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
    tableName: "settings",
  }
);
