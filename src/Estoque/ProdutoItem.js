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
import { Delete, Edit, Label, MoreVert } from "@material-ui/icons";
import React from "react";

const ProdutoItem = ({ setProduto, produto }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    if (action == "edit") setProduto(produto);
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
          <Avatar>
            <Label />
          </Avatar>
        </Grid>
        <Grid item style={{ paddingLeft: "10px" }}>
          <Typography variant="subtitle1">
            <b>{produto.nome}</b>
          </Typography>
          <Typography variant="body1">
            Quantidade: {produto.quantidade}
          </Typography>
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
            // setProduto(produto);
            handleClose("edit");
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Editar
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

export default ProdutoItem;
