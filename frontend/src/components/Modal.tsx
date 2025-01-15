import React from "react";
import { Box, Typography, Button, Backdrop } from "@mui/material";

type ModalProps = {
  open: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close the modal
  onConfirm: () => void; // Callback for confirm action
};

const Modal: React.FC<ModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: 1200, // Ensure it appears above other components
        backdropFilter: "blur(4px)", // Adds a translucent effect
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark background
      }}
    >
      <Box
        sx={{
          width: 300,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="text.primary">
          Are you sure?
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              cursor: "pointer",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
              cursor: "pointer",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default Modal;
