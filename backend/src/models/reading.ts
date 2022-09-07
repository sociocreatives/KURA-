import { Model, DataTypes } from "sequelize";
import { User } from ".";
import db from "../config/database.config";

interface Attrs {
  id?: number;
  transporter: string;
  owner: string;
  source: string;
  destination: string;
  cargo: string;
  serial: string;
  overloaded?: false;
  registration: string;
  weights: string; // "[{weig: 1}]"
  user_id: number;
}

export class Reading extends Model<Attrs> {
  id?: number;
  transporter: string | undefined;
  owner: string | undefined;
  source: string | undefined;
  destination: string | undefined;
  cargo: string | undefined;
  serial: string | undefined;
  overloaded?: false;
  registration: string | undefined;
  weights: string | undefined; // "[{weig: 1}]"
  user_id: number | undefined;
  createdAt: string | undefined;
}

Reading.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    transporter: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    serial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overloaded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weights: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "readings",
  }
);

Reading.belongsTo(User, { foreignKey: "user_id" });
