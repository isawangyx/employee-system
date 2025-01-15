"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getAllEmployee = void 0;
const employeeService = __importStar(require("../services/employee.service"));
const getAllEmployee = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const { employees, totalEmployees, currentPage, totalPages } = await employeeService.getAllEmployee(page, limit);
        res.status(200).json({ employees, totalEmployees, currentPage, totalPages });
    }
    catch (error) {
        res.status(500).send({ errorMessage: error.message });
    }
};
exports.getAllEmployee = getAllEmployee;
const getEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.emp_id);
        const employee = await employeeService.getEmployee(id);
        console.log(employee);
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(404).send({ errorMessage: error.message });
    }
};
exports.getEmployee = getEmployee;
const createEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(400).send({ errorMessage: error.message });
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.emp_id);
        const employee = await employeeService.getEmployee(id);
        const isUnchanged = Object.keys(req.body).every((key) => req.body[key] ===
            employee[key]);
        if (isUnchanged) {
            res.sendStatus(304);
            return;
        }
        const updatedEmployee = await employeeService.updateEmployee(id, req.body);
        res.status(200).json(updatedEmployee);
    }
    catch (error) {
        res.status(404).send({ errorMessage: error.message });
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res) => {
    try {
        const id = parseInt(req.params.emp_id);
        await employeeService.deleteEmployee(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(404).send({ errorMessage: error.message });
    }
};
exports.deleteEmployee = deleteEmployee;
