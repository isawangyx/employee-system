import { Sequelize } from "sequelize-typescript";
import config from "./config";
import path from "path";
import Employee from "../models/employee.model";
import User from "../models/user.model";
import Department from "../models/department.model";

const sequelize = new Sequelize({
  ...config.getDatabaseConfig(),
  dialect: "postgres",
  models: [path.resolve(__dirname + "../models")],
});

sequelize.addModels([Employee, User, Department]);

export default sequelize;
