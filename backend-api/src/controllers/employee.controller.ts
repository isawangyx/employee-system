import { Request, Response } from "express";
import * as employeeService from "../services/employee.service";

export const getAllEmployee = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const { employees, totalEmployees, currentPage, totalPages } = await employeeService.getAllEmployee(page, limit);
    res.status(200).json({ employees, totalEmployees, currentPage, totalPages });
  } catch (error: any) {
    res.status(500).send({ errorMessage: error.message });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.emp_id);
    const employee = await employeeService.getEmployee(id);
    console.log(employee);
    res.status(200).json(employee);
  } catch (error: any) {
    res.status(404).send({ errorMessage: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(200).json(employee);
  } catch (error: any) {
    res.status(400).send({ errorMessage: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.emp_id);
    const employee = await employeeService.getEmployee(id);
    const isUnchanged = Object.keys(req.body).every(
      (key) =>
        req.body[key as keyof typeof req.body] ===
        employee[key as keyof typeof employee]
    );
    if (isUnchanged) {
      res.sendStatus(304);
      return;
    }
    const updatedEmployee = await employeeService.updateEmployee(id, req.body);
    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(404).send({ errorMessage: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.emp_id);
    await employeeService.deleteEmployee(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(404).send({ errorMessage: error.message });
  }
};
