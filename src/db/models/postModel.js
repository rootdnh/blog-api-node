import databaseConnection from "../connection.js";
import { DataTypes } from "sequelize";
import userModel from "./userModel.js";

const postModel = databaseConnection.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

postModel.belongsTo(userModel, {
  foreignKey: "idUser"
});

userModel.hasMany(postModel, {
  foreignKey: "idUser"
})

export default postModel;