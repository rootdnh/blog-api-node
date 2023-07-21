import databaseConnection from "../connection.js";
import { DataTypes } from "sequelize";
import postModel from "./postModel.js";

const categoryModel = databaseConnection.define("category",{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true
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

categoryModel.hasMany(postModel, {
  foreignKey: "idCategory"
})

export default categoryModel;