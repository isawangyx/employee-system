import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import { validateEmployee } from "../middlewares/validate";

const router = Router();

router.post("/", validateEmployee, employeeController.createEmployee);

router.get("/", employeeController.getAllEmployee);

router.get("/:emp_id", employeeController.getEmployee);

router.put("/:emp_id", validateEmployee, employeeController.updateEmployee);

router.delete("/:emp_id", employeeController.deleteEmployee);

export default router;
