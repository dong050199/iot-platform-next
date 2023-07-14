import { useState, useEffect } from "react";

import debounce from "lodash/debounce";

import Pagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import { PAGINATION } from "../constants/pagination";

const TextFieldGotoPageRoot = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    padding: "2px 8px !important",
    textAlign: "center",

    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

const GoToPage = ({ page, onPageChange }: any) => {
  const [pageState, setPageState] = useState(page);

  useEffect(() => {
    setPageState(page || 0);
  }, [page]);

  const handleOnChange = (event: any) => {
    const newPage = parseInt((event.target?.value as any) || 1, 10) - 1;
    setPageState(newPage);
    onPageChangeDebounce(newPage);
  };

  const onPageChangeDebounce = debounce(
    (newPage) => onPageChange(null, newPage),
    600
  );

  return (
    <>
      <Typography variant="body2" sx={{ ml: 4, mr: 2, flexShrink: 0 }}>
        Page:
      </Typography>
      <TextFieldGotoPageRoot
        value={pageState + 1}
        onChange={handleOnChange}
        size="small"
        type="number"
        style={{ width: 80 }}
      />
    </>
  );
};

const TablePaginationRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",

  "& .MuiTablePagination-root": {
    "& .MuiTablePagination-select": {
      fontSize: "0.75rem",
    },
  },
}));

export const TablePagination = ({
  total,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: any) => {
  return (
    <TablePaginationRoot>
      <Pagination
        size="small"
        rowsPerPageOptions={PAGINATION.PER_PAGE_OPTIONS}
        component="div"
        count={total}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        showFirstButton
        showLastButton
      />
      <GoToPage page={page} onPageChange={onPageChange} />
    </TablePaginationRoot>
  );
};
