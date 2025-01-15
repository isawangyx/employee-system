import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import employeeRoutes from "./routes/employee.routes";
import sequelize from "./config/db_connection";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/employee", employeeRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server: ", error);
  }
});
