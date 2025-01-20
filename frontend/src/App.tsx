import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import ErrorPage from "./pages/ErrorPage";
import AddEditEmployeePage from "./pages/AddEditEmployeePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const isAuthenticated = !!localStorage.getItem("authToken");

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? <EmployeeListPage /> : <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-edit",
    element: (
      <ProtectedRoute>
        <AddEditEmployeePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-edit/:id",
    element: (
      <ProtectedRoute>
        <AddEditEmployeePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
