import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Department from "./department.model";

interface EmployeeAttributes {
  id: number;
  name: string;
  salary: number;
  departmentId: number;
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

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare departmentId: number;

  @BelongsTo(() => Department)
  department!: Department;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
