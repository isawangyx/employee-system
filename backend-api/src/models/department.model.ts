import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Employee from "./employee.model";
import User from "./user.model";

@Table({
  timestamps: false,
  tableName: "departments",
  modelName: "Department",
})
export default class Department extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM("Admin", "HR", "PS"),
    allowNull: false,
  })
  declare name: "Admin" | "HR" | "PS";

  @HasMany(() => Employee)
  employees!: Employee[];

  @HasMany(() => User)
  users!: User[];
}
