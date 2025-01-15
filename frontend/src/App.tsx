import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import ErrorPage from "./pages/ErrorPage";
import AddEditEmployeePage from "./pages/AddEditEmployeePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeListPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-edit",
    element: <AddEditEmployeePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-edit/:id",
    element: <AddEditEmployeePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
