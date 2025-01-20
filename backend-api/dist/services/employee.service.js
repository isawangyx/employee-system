"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getEmployeesByDepartment = void 0;
const department_model_1 = __importDefault(require("../models/department.model"));
const employee_model_1 = __importDefault(require("../models/employee.model"));
const getEmployeesByDepartment = async (departmentId, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    // Filter employees by departmentId
    const { rows: employees, count: totalEmployees } = await employee_model_1.default.findAndCountAll({
        where: departmentId == 1 ? {} : { departmentId },
        include: [
            {
                model: department_model_1.default,
                as: "department",
                attributes: ["name"],
            },
        ],
        limit,
        offset,
    });
    console.log(employees);
    return {
        employees,
        totalEmployees,
    };
};
exports.getEmployeesByDepartment = getEmployeesByDepartment;
const getEmployee = async (id) => {
    const employee = await employee_model_1.default.findOne({ where: { id } });
    if (!employee) {
        throw new Error(`Employee with id ${id} not found`);
    }
    return employee;
};
exports.getEmployee = getEmployee;
const createEmployee = async (data) => {
    const employee = await employee_model_1.default.create(data);
    return employee;
};
exports.createEmployee = createEmployee;
const updateEmployee = async (id, data) => {
    const employee = await (0, exports.getEmployee)(id);
    const updatedEmployee = await employee.update(data);
    return updatedEmployee;
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (id) => {
    const employee = await (0, exports.getEmployee)(id);
    await employee.destroy();
};
exports.deleteEmployee = deleteEmployee;
