import { AccountCircle } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/user";
import { removeAccessToken } from "../../utils/cookies";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
interface userButtonPopover {
  email: string;
  name: string;
}

export const UserPopover: FC<userButtonPopover> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUserInfo({}));
    removeAccessToken();
    router.reload();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 1, background: "#f7f7f7" }}>
          <Paper>
            <Grid>
              <Grid item>
                <Button
                  style={{ justifyContent: "flex-start", textTransform: "none" }}
                  fullWidth
                  startIcon={<BadgeIcon />}
                  sx={{ p: 2, boxShadow: 2, color: "black" }}
                >
                  {props.email}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ justifyContent: "flex-start", textTransform: "none" }}
                  fullWidth
                  startIcon={<EmailIcon />}
                  sx={{ p: 2, boxShadow: 2, color: "black" }}
                >
                  {props.name}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ justifyContent: "flex-start", textTransform: "none" }}
                  fullWidth
                  startIcon={<LogoutIcon />}
                  sx={{ p: 2, boxShadow: 2, color: "black" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Popover>
    </>
  );
};
