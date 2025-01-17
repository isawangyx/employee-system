import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
import { validateEmployee } from "../middlewares/validate";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", validateEmployee, employeeController.createEmployee);

router.get("/", auth, employeeController.getAllEmployee);

router.get("/:emp_id", auth, employeeController.getEmployee);

router.put(
  "/:emp_id",
  auth,
  validateEmployee,
  employeeController.updateEmployee
);

router.delete("/:emp_id", auth, employeeController.deleteEmployee);

export default router;
