"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const db_connection_1 = __importDefault(require("./config/db_connection"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use("/employee", employee_routes_1.default);
app.listen(PORT, async () => {
    try {
        await db_connection_1.default.sync({ alter: true });
        console.log(`Server is running at http://localhost:${PORT}`);
    }
    catch (error) {
        console.error("Error starting server: ", error);
    }
});
