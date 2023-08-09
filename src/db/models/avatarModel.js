import { DataTypes } from "sequelize";
import databaseConnection from "../connection.js";
import userModel from "./userModel.js";

export const avatarModel = databaseConnection.define("avatars", {
  id: {
    type:  DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  hashedName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

avatarModel.belongsTo(userModel, {
  foreignKey: "idUser"
});

userModel.hasOne(avatarModel, {
  foreignKey: "idUser"
})