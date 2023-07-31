import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";

export interface SnackBarProps {
  messageType: any;
  content: string;
  timeToast: 0;
}

export const SnackBar: FC<SnackBarProps> = (props) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const [severity, setServerity] = useState<AlertColor>("info");
  useEffect(() => {
    if (props.timeToast !== 0) {
      setOpenSnackBar(true);
      setServerity(props.messageType);
    }
  }, [props]);

  return (
    <>
      {props.messageType && props.content && props.timeToast && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {props.content}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
