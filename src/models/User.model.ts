import { Sequelize, DataTypes, UUIDV4, Model } from "sequelize";
import { IUserModel } from "./interfaces.models";
import adaraSequelize from "../database/main.database";


class AdaraUser extends Model implements IUserModel {
  public uuid!: string;
  public firstName!: string;
  public lastName!: string;
  public secondLastName!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public active!: boolean;
}

AdaraUser.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    secondLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    sequelize: adaraSequelize,
    modelName: "AdaraUser",
    tableName: "adara_users",
    timestamps: true,
  }
);

export default AdaraUser;
