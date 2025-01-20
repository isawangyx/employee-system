import { useState, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid2,
} from "@mui/material";
import EmployeeList from "../components/EmployeeList";
import Modal from "../components/Modal";
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../store/Employees/employeeApi";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { authApi } from "../store/Authentication/authApi";

const EmployeeListPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = Number(searchParam.get("page")) || 1;
  const employeesPerPage = 10;
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchEmployees,
  } = useGetEmployeesQuery({
    page: currentPage,
  });
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const employees = data?.employees || [];
  const totalPages = data?.totalPages || 1;
  const totalEmployees = data?.totalEmployees || 0;
  console.log(totalEmployees);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (authToken) {
      refetchEmployees();
    }
  }, [authToken, refetchEmployees]);

  const handleOpenModal = (id: number) => {
    setSelectedEmployeeId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployeeId !== null) {
      await deleteEmployee(selectedEmployeeId);
      handleCloseModal();
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/add-edit/${id}`);
  };

  const handlePageChange = (page: number) => {
    setSearchParam({ page: page.toString() });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleLogout = () => {
    // Clear the auth token from localStorage or cookies
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    dispatch(authApi.util.resetApiState()); // Reset API state to clear cached data)
    navigate("/login"); // Redirect to the login page
  };

  const startEntry =
    totalEmployees > 0 ? (currentPage - 1) * employeesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * employeesPerPage, totalEmployees);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box mt={3}>
        <Alert severity="error">
          {error instanceof Error ? error.message : "Failed to fetch employees"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid2
        container
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        sx={{
          backgroundColor: "#223b63",
          color: "white",
          padding: 2,
        }}
      >
        <Typography variant="h4" color="white" fontWeight={600}>
          Employees
        </Typography>
        <Box display="flex" alignItems="center">
          {isSmallScreen ? (
            <Box
              onClick={() => navigate("/add-edit")}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "#223b63",
                cursor: "pointer",
                fontSize: "30px",
                marginRight: "10px",
              }}
            >
              +
            </Box>
          ) : (
            <NavLink to="/add-edit">
              <Button
                variant="contained"
                color="success"
                sx={{ padding: "12px", marginRight: "10px" }}
              >
                Add Employee
              </Button>
            </NavLink>
          )}
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ padding: "12px" }}
          >
            Logout
          </Button>
        </Box>
      </Grid2>

      <EmployeeList
        employees={employees}
        onEdit={(id) => handleEdit(id)}
        onDelete={(id) => handleOpenModal(id)}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        flexWrap="wrap"
      >
        {!isSmallScreen && (
          <Typography variant="body2" color="#223b63">
            Showing{" "}
            <b>
              {startEntry}-{endEntry}
            </b>{" "}
            out of <b>{totalEmployees}</b> entries
          </Typography>
        )}

        <Box
          display="flex"
          alignItems="center"
          flex="1"
          justifyContent="flex-end"
        >
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{
              marginRight: 2,
              textTransform: "none",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Previous
          </Button>
          <Typography variant="body1" mx={2} fontWeight={600}>
            {currentPage}
          </Typography>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            sx={{
              textTransform: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default EmployeeListPage;
