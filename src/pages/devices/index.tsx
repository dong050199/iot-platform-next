import React, { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { PersistentDrawerLeftComponent } from "../../components/appBar/appBar";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../../components/severity-pill";
import Head from "next/head";
import { Skeleton } from "../../components/skeleton";
import { MuiTable } from "../../components/mui-table";
import AddDeviceGroupModal, { AddDeviceModal } from "./container/modal";

const Device: NextPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const handleCreateGroup = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const columns = useMemo(
    () => [
      {
        header: "Campaign Name",
        accessorKey: "name",
        size: 200,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => (
          <>
            <Typography>{cell.getValue()}</Typography>
          </>
        ),
        Footer: ({ table }: any) => {
          let rowModel = table.getRowModel().rows;
          let totalCount = 0;
          // if (rowModel.length > 0) {
          //   totalCount = rowModel[0]?.original?.summary?.countTotal;
          // }
          return (
            <Box>
              <Typography
                sx={{
                  color: "#000000",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "17px",
                }}
              >
                TOTAL: {totalCount}
              </Typography>
            </Box>
          );
        },
      },
      {
        header: "Portfolio",
        accessorKey: "portfolio",
        size: 180,
        typeFilter: "includesMultipleFilter",
      },
      {
        header: "Status",
        accessorKey: "status",
        size: 150,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => {
          return (
            <SeverityPill
              color="primary"
              style={{
                minWidth: "100px",
                backgroundColor: row?.original?.statusColor || "primary",
              }}
            >
              {cell?.getValue()}
            </SeverityPill>
          );
        },
      },
      {
        header: "Type",
        accessorKey: "campaignTypeName",
        size: 200,
        typeFilter: "includesMultipleFilter",
        Cell: ({ cell, row }: any) => {
          return (
            <>
              <Typography sx={{ color: "#5E5E5E" }}>
                {cell.getValue()}
              </Typography>
              <Typography
                sx={{
                  color: "#5E5E5E",
                  fontSize: "0.75rem",
                  textTransform: "capitalize",
                }}
              >
                {row.original?.targetingType?.toLowerCase()} targeting
              </Typography>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Rule Campaign | Yes4All</title>
      </Head>
      <Container maxWidth={false}>
        <Skeleton isLoading={false}>
          <Box sx={{ pt: "18px", ml: "0px", mb: 3 }}>
            <MuiTable
              columns={columns}
              data={[]}
              // loading={isLoading}
              getRowId={(row: any) => row.awsCampaignID}
              // pagination={{
              // 	...getPagination({ rowsPerPage: 10, page: 10 }),
              // 	total:100 ,
              // 	onPageChange: handleOnPageChange,
              // 	onRowsPerPageChange: handleOnRowsPerPageChange,
              // }}
              enableStickyFooter={true}
              // state={{ rowSelection, expanded }}
              enableExpandAll={false}
              enableSelectAll={false}
              enableRowVirtualization={false}
              positionExpandColumn="first"
              muiTableHeadCellProps={{
                sx: {
                  background: "#F3F4F6",
                },
              }}
              displayColumnDefOptions={{
                "mrt-row-expand": {
                  size: 20,
                  Header: () => "",
                },
                "mrt-row-select": {
                  size: 20,
                  Header: () => "",
                },
              }}
              // onRowSelectionChange={onRowSelectionChange}
              // enableRowSelection={(row: any) => {
              // 	if (Object.keys(rowSelection).length < 1) {
              // 		return true;
              // 	} else if (has(rowSelection, row.id)) {
              // 		return true;
              // 	} else {
              // 		return false;
              // 	}
              // }}
              renderTopToolbarCustomActions={() => (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "inherit",
                    p: 1,
                    pl: 0,
                  }}
                >
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        {/* <BudgetSearch
														onSearch={handleOnSearch}
														valuesSearch={{ searchBy, searchByValue }}
														searchByOptions={[
															{ label: 'Campaign name', value: 'name', status: false },
														]}
													/> */}
                      </Grid>
                      <Grid item>
                        <Button
                          type="submit"
                          size="medium"
                          variant="contained"
                          onClick={handleCreateGroup}
                          // disabled={!Object.keys(rowSelection).length}
                          // onClick={(row: any) => {
                          // 	setOpen(true);
                          // 	setPath(
                          // 		getPathFromTypeCampaign(
                          // 			rulesMap.get(Object.keys(rowSelection)[0])?.campaignType
                          // 		)
                          // 	);
                          // }}
                          sx={{
                            backgroundColor: "#ec7211",
                            "&:hover": { backgroundColor: "#ec7211" },
                          }}
                        >
                          Add Device
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    {/* <Tooltip
												title="Export"
												sx={{
													cursor: 'pointer',
												}}
											>
											</Tooltip> */}
                  </Grid>
                </Grid>
              )}
            />
          </Box>
        </Skeleton>
        <AddDeviceModal
          data={null}
          isOpen={openModal}
          handleOnClose={handleCloseModal}
        />
      </Container>
    </>
  );
};

Device.getLayout = (page: any) => (
  <PersistentDrawerLeftComponent>{page}</PersistentDrawerLeftComponent>
);

export default Device;
