import databaseConnection from "../connection.js";
import { DataTypes } from "sequelize";
import postModel from "./postModel.js";
import userModel from "./userModel.js";

const categoryModel = databaseConnection.define("category",{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
    unique: true
  }
});

postModel.belongsTo(categoryModel, {
  foreignKey: "idCategory"
});

categoryModel.hasMany(userModel, {
  foreignKey: "idCategory"
})

export default categoryModel;