import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

interface EmployeeAttributes {
  id: number;
  name: string;
  salary: number;
  department: "HR" | "PS";
}

interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "employees",
  modelName: "Employee",
})
export default class Employee extends Model<
  EmployeeAttributes,
  EmployeeCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare salary: number;

  @Column({
    type: DataType.ENUM("HR", "PS"),
    allowNull: false,
  })
  declare department: "HR" | "PS";

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
