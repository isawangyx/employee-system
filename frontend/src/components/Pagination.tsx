import React from "react";
import { Pagination, Box } from "@mui/material";

type PaginationFooterProps = {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  count,
  page,
  onPageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
      />
    </Box>
  );
};

export default PaginationFooter;
