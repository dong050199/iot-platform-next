import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import DevicesOtherRoundedIcon from "@mui/icons-material/DevicesOtherRounded";
import DeviceThermostatRoundedIcon from "@mui/icons-material/DeviceThermostatRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AssistantDirectionRoundedIcon from "@mui/icons-material/AssistantDirectionRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  getAccessToken,
  getUserInfoFromCookie,
  removeAccessToken,
  removeUserInfoFromCookie,
  setAccessToken,
} from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces/userProfile";
import { selectUser } from "../../redux/selectors/user";
import { getUserInfo } from "../../services/apis/users";
import { setUserInfo } from "../../redux/actions/user";
import { UserPopover } from "./userPopover";

interface IappBarProps {
  children?: React.ReactNode;
  window?: () => Window;
}

export const PersistentDrawerLeftComponent: React.FC<IappBarProps> = (
  props: IappBarProps
) => {
  const theme = useTheme();
  const router = useRouter();
  const [userInfo, setUserInfo] = React.useState<IUser>({});
  React.useEffect(() => {
    const { email, name } = getUserInfoFromCookie();
    setUserInfo({
      name: name,
      email: email,
    });
  }, []);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleSwitchHome = () => {
    router.push("/home");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sidebars = [
    {
      title: "Device Groups",
      icon: <DevicesOtherRoundedIcon sx={{ color: "white" }} />,
      path: "/device-groups",
    },
    {
      title: "Device",
      icon: <DeviceThermostatRoundedIcon sx={{ color: "white" }} />,
      path: "/devices",
    },
    {
      title: "Rules",
      icon: <AssistantDirectionRoundedIcon sx={{ color: "white" }} />,
      path: "/rules",
    },

    {
      title: "Dashboard",
      icon: <SettingsRoundedIcon sx={{ color: "white" }} />,
      path: "/dashboard",
    },
    {
      title: "Usage",
      icon: <InboxIcon sx={{ color: "white" }} />,
      path: "/usage",
    },
    {
      title: "User Groups",
      icon: <ManageAccountsRoundedIcon sx={{ color: "white" }} />,
      path: "/user-groups",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          elevation={10}
          style={{ background: "#2E3B55" }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Button onClick={handleSwitchHome}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color={"while"}
                style={{ textTransform: "none" }}
                sx={{ flexGrow: 1, fontSize: 22, color: "white" }}
              >
                Hura IoT
              </Typography>
            </Button>
            <AccountButton email={userInfo?.email} name={userInfo?.name} />
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              background: "#2E3B55",
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          elevation={15}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton sx={{ color: "white" }} onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sidebars.map((sidebar, index) => (
              <ListItem
                sx={{ height: 70, color: "white", fontWeight: "bold" }}
                key={sidebar.title}
                disablePadding
              >
                <ListItemButton
                  divider
                  component="a"
                  sx={{ background: "#2E3B55", p: 2 }}
                  onClick={() => {
                    router.push(sidebar.path);
                  }}
                >
                  <ListItemIcon>{sidebar.icon}</ListItemIcon>
                  <ListItemText primary={sidebar.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <Main sx={{ p: 0, background: "#eeeeee" }} open={open}>
          <DrawerHeader />
          {props.children}
        </Main>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="info"
            sx={{ width: "100%" }}
          >
            You must loggin to see all contents!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

const AccountButton = (props: any) => {
  const router = useRouter();
  if (!!!props.email) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              m: 1,
              border: "Highlight",
              backgroundColor: "#ec7211",
              "&:hover": { backgroundColor: "#ec7211" },
            }}
            onClick={() => {
              // remove access toke  and clear props on dispatch
              removeAccessToken();
              removeUserInfoFromCookie();
              // return to home page
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              m: 1,
              border: "Highlight",
              backgroundColor: "#ec7211",
              "&:hover": { backgroundColor: "#ec7211" },
            }}
            onClick={() => {
              // remove access toke  and clear props on dispatch
              removeAccessToken();
              removeUserInfoFromCookie();
              router.push("/signup");
            }}
          >
            Register
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserPopover email={props.email || ""} name={props.name || ""} />
        </Box>
      </>
    );
  }
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

PersistentDrawerLeftComponent.propTypes = {
  children: PropTypes.node,
};
