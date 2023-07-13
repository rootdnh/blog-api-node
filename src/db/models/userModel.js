import { DataTypes } from "sequelize";
import connection from "../connection.js";
import {v4 as uuidv4} from "uuid";

const userModel = connection.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: ()=> uuidv4(),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW(),
    allowNull: false
  }
},{
  timestamps: false
});

export default userModel;