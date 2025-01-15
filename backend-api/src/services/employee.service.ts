import Employee from "../models/employee.model";
import EmployeeCreationAttributes from "../models/employee.model";

export const getAllEmployee = async (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  const { rows: employees, count: totalEmployees } =
    await Employee.findAndCountAll({
      limit,
      offset,
    });

  return {
    employees,
    totalEmployees,
    currentPage: page,
    totalPages: Math.ceil(totalEmployees / limit),
  };
};

export const getEmployee = async (id: number) => {
  const employee = await Employee.findOne({ where: { id } });
  if (!employee) {
    throw new Error(`Employee with id ${id} not found`);
  }
  return employee;
};

export const createEmployee = async (data: EmployeeCreationAttributes) => {
  const employee = await Employee.create(data);
  return employee;
};

export const updateEmployee = async (id: number, data: Partial<Employee>) => {
  const employee = await getEmployee(id);
  const updatedEmployee = await employee.update(data);
  return updatedEmployee;
};

export const deleteEmployee = async (id: number) => {
  const employee = await getEmployee(id);
  await employee.destroy();
};
