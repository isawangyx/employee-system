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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use("/auth", auth_routes_1.default);
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
