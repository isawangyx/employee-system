"use strict";

import { QueryInterface, DataTypes, QueryTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Create Department Table
    await queryInterface.createTable("departments", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });

    // Create User Table
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references: { model: "departments", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    });

    // Add departmentId to Employee Table
    await queryInterface.addColumn("employees", "departmentId", {
      type: DataTypes.INTEGER,
      references: { model: "departments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Populate Department Table with Initial Data
    await queryInterface.bulkInsert("departments", [
      { id: 1, name: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "HR", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "PS", createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Map Existing Employees to Departments
    const employees = await queryInterface.sequelize.query(
      `SELECT id, department FROM employees`,
      { type: QueryTypes.SELECT }
    );

    for (const employee of employees as { id: number; department: string }[]) {
      const departmentId =
        employee.department === "HR" ? 2 : employee.department === "PS" ? 3 : 1;

      await queryInterface.sequelize.query(
        `UPDATE employees SET departmentId = ${departmentId} WHERE id = ${employee.id}`
      );
    }

    // Remove Old Department Column from Employees
    await queryInterface.removeColumn("employees", "department");
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // Rollback changes
    await queryInterface.addColumn("employees", "department", {
      type: DataTypes.ENUM("HR", "PS"),
      allowNull: false,
    });

    await queryInterface.sequelize.query(
      `UPDATE employees SET department = CASE
        WHEN departmentId = 2 THEN 'HR'
        WHEN departmentId = 3 THEN 'PS'
      END`
    );

    await queryInterface.removeColumn("employees", "departmentId");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("departments");
  },
};
