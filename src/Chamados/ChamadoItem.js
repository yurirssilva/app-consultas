import {
  Avatar,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { Delete, MoreVert, OpenInNew, Receipt } from "@material-ui/icons";
import React from "react";

const ChamadoItem = ({ handleAction, chamado }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    if (action) handleAction(chamado, action);
    setAnchorEl(null);
  };

  return (
    <Paper style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ padding: "1rem", display: "flex" }}>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Avatar
            style={{
              backgroundColor:
                chamado.tipo_servico.prioridade == "Alta"
                  ? "red"
                  : chamado.tipo_servico.prioridade == "Media"
                  ? "yellow"
                  : "green",
            }}
          >
            <Receipt />
          </Avatar>
        </Grid>
        <Grid item style={{ paddingLeft: "10px" }}>
          <Typography variant="subtitle1">
            <b>{chamado.descricao}</b>
          </Typography>
          <Typography variant="body1">{chamado.tipo_servico.nome}</Typography>
        </Grid>
      </div>
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton
          aria-controls="menu-opcoes"
          aria-label="opcoes"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
      </Grid>
      <Menu
        id="menu-opcoes"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose("ver");
          }}
        >
          <ListItemIcon>
            <OpenInNew fontSize="small" />
          </ListItemIcon>
          Abrir
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Remover
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ChamadoItem;
