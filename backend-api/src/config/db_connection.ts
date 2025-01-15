import { Sequelize } from "sequelize-typescript";
import config from "./config";
import Employee from "../models/employee.model";

const sequelize = new Sequelize({
  ...config.getDatabaseConfig(),
  dialect: "postgres",
  models: [__dirname + "../models"],
});

sequelize.addModels([Employee]);

export default sequelize;
