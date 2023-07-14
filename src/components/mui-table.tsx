// eslint-disable-next-line no-console
import {MouseEvent, FC, useMemo } from "react";

import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";
import map from "lodash/map";
import debounce from "lodash/debounce";

import MaterialReactTable, {
  MaterialReactTableProps,
} from "material-react-table";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { TablePagination } from "../components/table-pagination";

import {
  includesFilter,
  includesMultipleFilter,
  equalDateFilter,
} from "../utils/filter";

import { styled } from "@mui/material/styles";

const TextFieldFilter = ({ onChange }: any) => (
  <TextField
    style={{ margin: 0 }}
    size="small"
    onChange={debounce(onChange, 800)}
    margin="dense"
    placeholder="Eg: 3,-5,3-,5-10"
    fullWidth
  />
);

const MuiTableRoot = styled(Paper)(({ theme }) => {
  return {
    position: "relative",

    "& > .MuiPaper-root": {
      boxShadow: "none",
      "& .MuiCollapse-wrapperInner": {
        "& .MuiAlert-standardInfo.MuiAlert-standard": {
          display: "none !important",
        },
      },

      "& .hide-button-expand": {
        display: "none",
      },
    },

    "& .MuiTable-root": {
      "& .MuiTableHead-root": {
        "& .MuiTableRow-root": {
          boxShadow: "none",

          "& .MuiTableCell-root": {
            "& .MuiDivider-root": {
              marginRight: "-4px",
              opacity: 0,
            },

            "& .MuiTableSortLabel-root": {
              "& .MuiTableSortLabel-icon": {
                color: "#9E9E9E",
              },
              "+ span > button": {
                pointerEvents: "none",
              },
            },

            "& .MuiCollapse-entered": {
              paddingRight: "4px",
            },

            "&:hover": {
              "& .MuiDivider-root": {
                opacity: 1,
              },
            },
          },
        },
      },

      "& .MuiTableBody-root": {
        "& .MuiTableRow-root": {
          background: "none",
        },
      },
    },

    "& .loading": {
      position: "absolute",
      overflow: "hidden",
      zIndex: 2,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgb(158 158 158 / 10%)",
      borderRadius: "8px",
    },
  };
});

export interface MuiTablePaginationProps {
	total?: number;
	rowsPerPage?: number;
	page?: number;
	onPageChange?: (event?: MouseEvent<HTMLButtonElement> | null, newPage?: number) => void;
	onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface Props extends Omit<MaterialReactTableProps, "columns"> {
  pagination?: MuiTablePaginationProps;
  loading?: boolean;
  columns?: any[];
  state?: any;
  enableColumnFilters?: boolean;
  enableFullScreenToggle?: boolean;
  noRecordsToDisplay?: string;
}

export const MuiTable: FC<Props> = (props) => {
  const {
    initialState,
    loading,
    pagination,
    columns,
    enableStickyFooter = false,
    data = [],
    enableColumnFilters = true,
    enableFullScreenToggle = true,
    noRecordsToDisplay = "No data available",
    state,
    ...restProps
  } = props;

  const {
    page,
    rowsPerPage,
    onRowsPerPageChange,
    onPageChange,
    total = 0,
  } = pick(pagination, [
    "page",
    "rowsPerPage",
    "onRowsPerPageChange",
    "onPageChange",
    "total",
  ]);

  const cloneColumns = useMemo(
    () =>
      map(columns, (item) => {
        let result: any = {};

        if (!item?.Filter) {
          result.Filter = ({ header }: any) => {
            return (
              <TextFieldFilter
                onChange={(e: any) =>
                  header.column.setFilterValue(e.target.value || undefined)
                }
              />
            );
          };
        }

        if (!item.filterFn) {
          result.filterFn = (row: any, _columnIds: any, filterValue: any) => {
            let funFilter = includesFilter;

            switch (item.typeFilter) {
              case "includesMultipleFilter":
                funFilter = includesMultipleFilter;
                break;
              case "equalDateFilter":
                funFilter = equalDateFilter;
                break;
            }
            return !isEmpty(
              funFilter({
                data: [row.original],
                field: _columnIds,
                value: filterValue,
              })
            );
          };
        }

        return {
          ...item,
          ...result,
        };
      }),
    [JSON.stringify(columns)]
  );

  return (
    <MuiTableRoot>
      <MaterialReactTable
        columns={cloneColumns}
        data={data}
        enableColumnOrdering
        enablePagination={false}
        enablePinning
        enableDensityToggle={false}
        initialState={{ density: "compact", ...initialState }}
        enableColumnResizing
        selectAllMode="all"
        enableColumnFilters={enableColumnFilters}
        enableBottomToolbar={false}
        enableGlobalFilter={false}
        state={{ isLoading: loading, ...state }}
        enableRowVirtualization
        enableStickyFooter={enableStickyFooter}
        enableFullScreenToggle={enableFullScreenToggle}
        muiTableContainerProps={{ sx: { maxHeight: "620px" } }}
        enableRowSelection
        localization={{
          noRecordsToDisplay: noRecordsToDisplay,
        }}
        {...restProps}
      />
      {!isEmpty(pagination) && (
        <Box sx={{ pl: 2, pr: 2 }}>
          <TablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </Box>
      )}
    </MuiTableRoot>
  );
};
