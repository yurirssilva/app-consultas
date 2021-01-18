import React from "react";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "./App.css";
import Funcionarios from "./Funcionarios/Funcionarios";
import Home from "./Home";
import {
  DescriptionRounded,
  HomeRounded,
  PersonRounded,
  ShoppingCartRounded,
  PollRounded,
  Group,
  Work,
} from "@material-ui/icons";
import Estoque from "./Estoque/Estoque";
import Chamados from "./Chamados/Chamados";
import Setores from "./Setores/Setores";
import Servicos from "./Servicos/Servicos";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [toolbarText, setToolbarText] = React.useState("Início");

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuList = [
    { text: "Início", icon: <HomeRounded />, link: "/" },
    { text: "Funcionários", icon: <PersonRounded />, link: "/funcionarios" },
    { text: "Setores", icon: <Group />, link: "/setores" },
    { text: "Serviços", icon: <Work />, link: "/servicos" },
    { text: "Estoque", icon: <ShoppingCartRounded />, link: "/estoque" },
    { text: "Chamados", icon: <DescriptionRounded />, link: "/chamados" },
    // { text: "Relatórios", icon: <PollRounded />, link: "/relatorios" },
  ];

  const handleToolbar = (text) => {
    setToolbarText(text);
  };
  const menu = (
    <div>
      <div className={classes.toolbar}/>
      <Typography variant="h4">Menu</Typography>
      <Divider />
      <List>
        {menuList.map((item, index) => (
          <Link to={item.link} key={index} onClick={() => handleToolbar(item.text)} underline="none">
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} underline="none"/>
            </ListItem>
            <Divider/>
          </Link>
        ))}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Abrir menu"
                edge="start"
                onClick={handleMenuToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {toolbarText}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleMenuToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{ keepMounted: true }}
              >
                {menu}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant="permanent"
                open
              >
                {menu}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/setores" element={<Setores />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/chamados" element={<Chamados />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
